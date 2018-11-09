import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data/data.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css']
})
export class NewEventComponent implements OnInit {
  sports: Array<String>;

  newEventForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private locationService: LocationService
  ) {}

  // sport: sport, name: name, date: date, deadline: deadline, description: description
  ngOnInit() {
    this.newEventForm = this.formBuilder.group({
      sport: ['', Validators.required],
      name: [''],
      location: [''],
      date: [''],
      deadline: [''],
      description: ['']
    });

    this.sports = new Array();

    this.setSports();
  }

  setSports() {
    this.dataService.getSports().subscribe(sportsresult => {
      for (const sport of sportsresult) {
        this.sports.push(sport.name);
      }
    });
  }

  get f() {
    return this.newEventForm.controls;
  }

  onSubmit() {
    this.dataService
      .postNewEvent(
        this.f.sport.value,
        this.f.name.value,
        this.f.location.value,
        this.f.date.value,
        this.f.deadline.value,
        this.f.description.value
      )
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
