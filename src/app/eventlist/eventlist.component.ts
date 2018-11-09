import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataService } from '../services/data/data.service';
import { Event } from 'src/app/models/event';
import { trigger, state, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventlistComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'sport',
    'date',
    'deadline',
    'location',
    'join'
  ];
  dataSource: MatTableDataSource<Event>;
  expandedEvent: Event;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getEvents();
  }

  getEvents() {
    this.dataService.getEvents().subscribe(result => {
      for (const event of result.results) {
        const e = new Event();
        e.copyInto(event);

        const copiedData = this.dataSource.data.slice();
        copiedData.push(e);
        this.dataSource.data = copiedData;
      }
    });
  }
}
