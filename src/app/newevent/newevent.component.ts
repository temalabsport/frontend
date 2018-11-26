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
          context.router.navigate(['/home']);
        },
        error => {
          context.router.navigate(['/home']);
        }
      );
  }

  onSubmit() {
    this.locationService.getLatLongFromAddress(this.f.location.value)
      .subscribe(result => this.postEvent(result.results[0].locations[0].latLng, this));
  }

}
