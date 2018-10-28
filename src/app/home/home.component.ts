import { Component, OnInit, ViewChild } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Event } from 'src/app/models/event';
import { DataService } from '../services/data/data.service';

declare var google: any;
declare var ol: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'sport', 'date', 'location'];
  dataSource: MatTableDataSource<Event>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  // events: Event[];

  map: any;


  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource();
  }

  showEvents() {
    this.dataService.getEvents()
      .subscribe( result => {
        for (const event of result.results) {
          const e = new Event();
          e.copyInto(event);

          const copiedData = this.dataSource.data.slice();
          copiedData.push(e);
          this.dataSource.data = copiedData;

        }
      });

  }

  /*createMockEvents() {
    let events: Event[];
    events = new Array();
    events.push({
      sport: 'foci',
      creator: 'bela',
      name: 'kosarmeccs',
      location: 'Wisconsin, Greenbay, Lambeau Field',
      date: '2019-01-01',
      deadline: '2019-01-01',
      description: 'asd'
    });
    for (let i = 0; i < 30; ++i) {
      events.push({
        sport: 'foci',
        creator: 'bela' + i.toString(),
        name: 'kosarmeccs' + i.toString(),
        location: 'Budapest, BME Sportközpont',
        date: '2019-01-01',
        deadline: '2019-01-01',
        description: 'asd' + i.toString()
      });
    }
    return events;
  }*/

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    this.initMap();
    this.showEvents();
  }

  initMap() {
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map'
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showOnMap(event: any) {
    this.getLatitudeLongitude(this.setLongLat, event.target.innerHTML);
  }

  getLatitudeLongitude(callback, address): void {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    const geocoder = new google.maps.Geocoder();
    const that = this;
    if (geocoder) {
      geocoder.geocode(
        {
          address: address
        },
        function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            callback(results[0], that);
          }
        }
      );
    }
  }

  setLongLat(result: any, that: any): void {
    const view = that.map.getView();
    view.setCenter(
      ol.proj.fromLonLat([
        result.geometry.location.lng(),
        result.geometry.location.lat()
      ])
    );

    view.setZoom(18);

  }

  showLongLat(result): void {
    console.log(result.geometry.location.lat());
    console.log(result.geometry.location.lng());
  }
}
