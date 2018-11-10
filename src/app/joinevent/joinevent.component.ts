import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer
} from '@angular/core';
import { Event } from '../models/event';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map, first } from 'rxjs/operators';
import { DataService } from '../services/data/data.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joinevent',
  templateUrl: './joinevent.component.html',
  styleUrls: ['./joinevent.component.css']
})
export class JoineventComponent implements OnInit {
  playerformControl = new FormControl();

  options: string[];
  filteredOptions: Observable<string[]>;

  teamMembers: string[];
  minPlayers = 3;
  maxPlayers = 5;
  teamFull: boolean;
  teamReady: boolean;

  event: Event;
  currentUser: string;

  @ViewChild('memberSelector') autoCompleteElement: ElementRef;

  constructor(
    private dataService: DataService,
    private renderer: Renderer,
    private router: Router) {

    this.teamFull = false;
    this.teamReady = false;
    console.log(JSON.parse(localStorage.getItem('currentUser')).body.userName);
    this.options = new Array();
    this.teamMembers = new Array();
    this.event = new Event();
    this.event.sport = 'Foci';
    this.event.name = 'Focimeccs';
    this.event.date = new Date();
    this.event.description = 'Ez itt egy focimeccs leírása. ';
  }

  ngOnInit() {
    this.currentUser = JSON.parse(
      localStorage.getItem('currentUser')
    ).body.userName;
    this.teamMembers.push(this.currentUser);
    this.dataService.getUsers().subscribe(result => {
      for (const user of result.results) {
        if (user.userName !== this.currentUser) {
          this.options.push(user.userName);
        }
      }

      this.filteredOptions = this.playerformControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSelectTeamMate(event: MatAutocompleteSelectedEvent) {
    const member = event.option.value;
    if (this.teamMembers.length < this.maxPlayers) {
      this.teamMembers.push(member);
      this.teamReady = true;

      const index: number = this.options.indexOf(member);
      if (index !== -1) {
        this.options.splice(index, 1);
      }

      this.playerformControl.setValue('');
      this.removeFocus();

      if (this.teamMembers.length === this.maxPlayers) {
        this.teamFull = true;
      }
    }
  }

  removeFocus() {
    this.renderer.invokeElementMethod(
      this.autoCompleteElement.nativeElement,
      'blur',
      []
    );
  }

  onDelete(member) {
    this.teamFull = false;
    this.options.push(member);
    this.playerformControl.setValue('');
    this.teamMembers.splice(this.teamMembers.indexOf(member), 1);
    if (this.teamMembers.length < this.minPlayers) {
      this.teamReady = false;
    }
  }

  onApply() {
    if (this.teamMembers.length < this.minPlayers) {
      return; // TODO hibaüzenet
    }
    this.dataService.postNewTeam()
    .pipe(first())
    .subscribe(
      resp => {
        this.router.navigate(['/home']);
      },
      error => {
        this.router.navigate(['/home']);
      }
    );
  }
}
