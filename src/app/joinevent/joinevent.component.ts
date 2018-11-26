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
import { Router, ActivatedRoute } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-joinevent',
  templateUrl: './joinevent.component.html',
  styleUrls: ['./joinevent.component.css']
})
export class JoineventComponent implements OnInit {
  playerformControl = new FormControl();

  options: string[];
  filteredOptions: Observable<string[]>;

  teamName = '';
  teamMembers: string[];
  minPlayers: number;
  maxPlayers: number;
  teamFull: boolean;
  teamReady: boolean;

  event: Event;
  currentUser: string;

  @ViewChild('memberSelector') autoCompleteElement: ElementRef;

  constructor(
    private dataService: DataService,
    private renderer: Renderer,
    private router: Router,
    private route: ActivatedRoute) {

    this.teamFull = false;
    this.teamReady = false;

    this.event = new Event();
    this.options = new Array();
    this.teamMembers = new Array();
  }

  ngOnInit() {
    let eventID: number;
    this.route.queryParams.subscribe(params => {
      eventID = params.eventID;
    });

    if(eventID !== undefined){
      this.initEvent(eventID);
    }

    if(localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(
        localStorage.getItem('currentUser')
      ).body.userName;
    }


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

  initEvent(eventID: number) {
    this.dataService.getEventByID(eventID)
    .subscribe(
      result => {
        this.event.copyFrom(result);
        this.minPlayers = this.event.minTeamSize;
        if (this.minPlayers === 1) { this.teamReady = true; }
        this.maxPlayers = this.event.maxTeamSize;
      },
      error => alert('Event not found!'));
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

      if (this.teamMembers.length >= this.minPlayers) {
        this.teamReady = true;
      }

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
    if (this.teamMembers.length < this.minPlayers || this.teamName === '') {
      return; // TODO hibaüzenet
    }
    this.dataService.postNewTeam(this.event.eventID, this.teamName, this.teamMembers)
    .pipe(first())
    .subscribe(
      resp => {
        this.router.navigate(['/events']);
      },
      error => {
        console.log(error);
        this.router.navigate(['/events']);
      }
    );
  }
}
