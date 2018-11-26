import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { Event } from 'src/app/models/event';
import { DataService } from '../services/data/data.service';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  events: Array<Event>;

  fullName: string;
  userName: string;
  intro: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.events = new Array();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userName = params.userName;
    });

    this.getProfile(this.userName);
    this.getEventsByUser(this.userName);
  }

  getProfile(userName: string) {
    this.dataService.getUser(userName).subscribe(
      result => {
        this.fullName = result.fullName;
        this.userName = result.userName;
        this.intro = result.introduction;
      },
      error => {
        // no such user
      }
    );
  }

  getEventsByUser(userName: string) {
    this.dataService.getEventsByUser(userName).subscribe(
      result => {
        const userEvents = result.results;
        for (const event of userEvents) {
          console.log(event.date);
          const e = new Event();
          e.copyFrom(event);
          this.events.push(e);
        }
      },
      error => {
        console.log('error');
      }
    );
  }
}
