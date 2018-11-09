import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';

@Component({
  selector: 'app-joinevent',
  templateUrl: './joinevent.component.html',
  styleUrls: ['./joinevent.component.css']
})
export class JoineventComponent implements OnInit {

  event: Event;
  constructor() {
    this.event = new Event();
    this.event.sport = 'Foci';
    this.event.name = 'Focimeccs';
    this.event.date = new Date();
    this.event.description = 'jdkanvjkanjknakjfnj  ajnfjkan jk njkfan jknsdjk n jkn kjf nkjfn kjf njknsfk';
  }

  ngOnInit() {
  }

}
