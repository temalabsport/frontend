import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataService } from '../services/data/data.service';
import { Event } from 'src/app/models/event';
import { trigger, state, transition, animate, style } from '@angular/animations';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import { Style, Fill } from 'ol/style';

declare var ol: any;

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./eventlist.component.css'],
})
export class EventlistComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'sport',
    'date',
    'deadline',
    'location',
    'distance',
    'join'
  ];
  dataSource: MatTableDataSource<Event>;
  expandedEvent: Event;

  map: any;
  vectorLayer: VectorLayer;
  circleFeature: Feature;
  zoom: 16;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  myPositionLonLat = {longitude: 0, latitude: 0};

  currentDate = new Date();

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getEventsFromMyPosition();  // eventek megszerzése saját pozíció alapján
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  initMap() {
    this.map = new Map({
      view: new View({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 1
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map'
    });


    this.vectorLayer = new VectorLayer({
      source: new Vector({
        features: []
      })
    });
  }

  setMap() {
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.expandedEvent.longitude, this.expandedEvent.latitude]));
    view.setZoom(this.zoom);
  }

  addEventCircle(lonLat: any, context: any) {
    const style = new Style({
      fill: new Fill({
          color: [51, 51, 51, .7]
      })
  });

    const circle = new Feature({
      geometry: new Circle(
        ol.proj.fromLonLat([lonLat.longitude, lonLat.latitude]),
        50
      )
    });

    circle.setStyle(style);
    context.vectorLayer.getSource().addFeature(circle);
  }

  getEventsFromMyPosition(): any {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.myPositionLonLat.latitude = position.coords.latitude;
          this.myPositionLonLat.longitude = position.coords.longitude;
          this.getEvents(this);
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    }
  }

  getEvents(context: any) {
    context.dataService.getEvents(context.myPositionLonLat).subscribe(result => {
      for (const event of result.results) {
        const e = new Event();
        e.copyFrom(event);

        const copiedData = context.dataSource.data.slice();
        copiedData.push(e);
        context.dataSource.data = copiedData;
      }
    });
  }
}
