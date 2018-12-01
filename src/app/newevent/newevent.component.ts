import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DataService } from '../services/data/data.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocationService } from '../services/location/location.service';
import { Event } from '../models/event';
import { MatSnackBar } from '@angular/material';
import { dateValidator } from '../validators/form-validator.directive';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css']
})
export class NewEventComponent implements OnInit {
  sports: Array<String>;

  newEventForm: FormGroup;
  loading: boolean;
  newEvent: Event;


  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private locationService: LocationService
  ) {
  }

  // sport: sport, name: name, date: date, deadline: deadline, description: description
  ngOnInit() {
    this.newEvent = new Event();
    this.newEventForm = new FormGroup({
      'sport': new FormControl('', [Validators.required]),
      'name': new FormControl(this.newEvent.name, [Validators.required]),
      'location': new FormControl(this.newEvent.location, [Validators.required]),
      'date': new FormControl(this.newEvent.date, [Validators.required, dateValidator()]),
      'deadline': new FormControl(this.newEvent.deadline, [Validators.required, dateValidator()]),
      'description': new FormControl(this.newEvent.description),
    });

    this.sports = new Array();

    this.setSports();
  }

  get name() { return this.newEventForm.get('name'); }
  get sport() { return this.newEventForm.get('sport'); }
  get location() { return this.newEventForm.get('location'); }
  get date() { return this.newEventForm.get('date'); }
  get deadline() { return this.newEventForm.get('deadline'); }
  get description() { return this.newEventForm.get('description'); }


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

  postEvent(lonLat, context) {
    context.dataService
      .postNewEvent(
        context.f.sport.value,
        context.f.name.value,
        context.f.location.value,
        context.f.date.value,
        context.f.deadline.value,
        context.f.description.value,
        lonLat.lat,
        lonLat.lng
      )
      .pipe(first())
      .subscribe(
        resp => {
          context.router.navigate(['/events']);
        },
        error => {
          context.router.navigate(['/events']);
        }
      );
  }

  onSubmit() {
    const deadline = this.newEventForm.controls.deadline.value;
    const date = this.newEventForm.controls.date.value;

    const deadlineLater = deadline > date;

    if (!this.newEventForm.valid || deadlineLater) {
      this.snackBar.open('Please fill all required fields with valid data!', 'OK')
      .onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
      return;
    }

    this.locationService.getLatLongFromAddress(this.f.location.value)
      .subscribe(result => this.postEvent(result.results[0].locations[0].latLng, this));
  }

}
