import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css']
})
export class NewEventComponent implements OnInit {
  sports: Array<String>;

  constructor() { }

  ngOnInit() {
    this.sports = new Array();
    this.sports.push('Foci');
    this.sports.push('Röplabda');
    this.sports.push('Kosárlabda');
    this.sports.push('Vízilabda');
  }

}
