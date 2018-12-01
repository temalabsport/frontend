import { Component, OnInit, ViewChild } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import { Style, Fill } from 'ol/style';


import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Event } from 'src/app/models/event';
import { DataService } from '../services/data/data.service';
import { LocationService } from '../services/location/location.service';

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

  vectorLayer: VectorLayer;
  circleFeature: Feature;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  // events: Event[];

  map: any;

  myPositionLonLat = {longitude: 0, latitude: 0};
  zoom = 16;
  unit = 1;
  distance = 500;

  constructor(
    private dataService: DataService,
    private locationService: LocationService
  ) {
    this.dataSource = new MatTableDataSource();
    this.circleFeature = undefined;
  }

  showEvents() {
    if (!localStorage.getItem('currentUser')) {
      return;
    }

    const userName = JSON.parse(localStorage.getItem('currentUser')).body
      .userName;

    const self = this;
    this.dataService.getEventsByUser(userName).subscribe(result => {
      for (const event of result.results) {
        const e = new Event();
        e.copyFrom(event);

        const copiedData = this.dataSource.data.slice();
        copiedData.push(e);

        this.dataSource.data = copiedData;
        for (const ev of copiedData) {
              this.addEventCircle({longitude: ev.longitude, latitude: ev.latitude}, this);
          // this.locationService.geocodeAddress(ev.location, self.addEventCircle, self);
        }
      }
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getMyPosition(this.initMap);
    this.showEvents();
  }

  showMyPosition(): any {
    /*this.myPositionLonLat = this.getMyPosition();*/
    this.setMap(this.myPositionLonLat, this);
  }


  getMyPosition(mapCallback): any {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.myPositionLonLat.latitude = position.coords.latitude;
          this.myPositionLonLat.longitude = position.coords.longitude;
          mapCallback(this.myPositionLonLat, this);
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
          this.myPositionLonLat.latitude = 0;
          this.myPositionLonLat.longitude = 0;
          mapCallback(this.myPositionLonLat, this);
        }
      );
    }
  }

  onDistanceChanged(event: any) {
    this.distance = event.target.value;
    this.setCircle(this.myPositionLonLat, this.distance * this.unit);
  }

  onUnitChanged(event: any) {
    this.unit = event.target.value;
    this.setCircle(this.myPositionLonLat, this.distance * this.unit);
  }

  initMap(lonLatPos, context) {
    context.map = new Map({
      view: new View({
        center: ol.proj.fromLonLat([lonLatPos.longitude, lonLatPos.latitude]),
        zoom: context.zoom
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map'
    });


    context.vectorLayer = new VectorLayer({
      source: new Vector({
        features: []
      })
    });

    context.setCircle(lonLatPos, context.distance);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showOnMap(event: any) {
    this.setMap({longitude: event.longitude, latitude: event.latitude}, this);
  }

  setMap(lonLat: any, context: any) {
    const view = context.map.getView();
    view.setCenter(ol.proj.fromLonLat([lonLat.longitude, lonLat.latitude]));
    view.setZoom(context.zoom);
  }

  addEventCircle(lonLat: any, context: any) {
    const style = new Style({
      /*stroke: new Stroke({
          color: '#b30734',
          width: 3
      }),*/
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

  setCircle(lonLat: any, distance: number) {
    if (this.circleFeature === undefined) {
      this.circleFeature = new Feature({
        geometry: new Circle(
          ol.proj.fromLonLat([lonLat.longitude, lonLat.latitude]),
          distance
        )
      });
      this.vectorLayer.getSource().addFeature(this.circleFeature);
      this.map.addLayer(this.vectorLayer);
    } else {
      // const circles = this.vectorLayer.getSource().getFeatures();  circles[circles.indexOf(this.circleFeature)]
        (this.circleFeature.getGeometry() as Circle)
      .setRadius(distance);
    }
  }

  showLongLat(result): void {
    console.log(result.geometry.location.lat());
    console.log(result.geometry.location.lng());
  }
}
