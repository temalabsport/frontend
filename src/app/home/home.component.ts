import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { query } from '@angular/core/src/render3/query';
import { Map } from 'node_modules/ol/map';


declare var google: any;
declare var ol: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit {
  // dtOptions: Promise<DataTables.Settings>;    kikommentezett http-s megoldáshoz

  dtOptions: DataTables.Settings = {};
  events: any[];

  // events: Event[] = [];
  // dtTrigger: Subject<any> = new Subject();

  map: any;

  constructor() {
  }


  ngOnInit(): void {
    this.events = [
      {
        id: 1,
        name: 'Basketball match',
        date: '2018-10-12T18:25:43.511Z',
        sport: 'Basketball',
        place: 'Tüske Csarnok, Budapest'
      },
      {
        id: 2,
        name: 'Volleyball match',
        date: '2018-11-11T18:25:43.511Z',
        sport: 'Volley',
        place: 'BME Sportközpont, Budapest'
      },
      {
        id: 3,
        name: 'Football match',
        date: '2018-12-01T18:00:00.511Z',
        sport: 'Football',
        place: 'Groupama Aréna, Budapest'
      },
      {
        id: 4,
        name: 'Basketball match',
        date: '2018-12-01T18:00:00.511Z',
        sport: 'Basketball',
        place: 'Staples Center, Los Angeles'
      },
      {
        id: 5,
        name: 'Tehénpóló meccs',
        date: '2018-12-01T18:00:00.511Z',
        sport: 'TehénPóló',
        place: 'Ménfői út 59, Gyirmót, Hungary'
      }
    ];

    this.initMap();
    console.log(this.map);

  }

  getLatitudeLongitude(callback, address): void {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    const geocoder = new google.maps.Geocoder();
    const that = this;
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              callback(results[0], that);
            }
        });
    }
  }

  showLongLat(result): void {
     console.log(result.geometry.location.lat());
     console.log(result.geometry.location.lng());
  }

  setLongLat(result: any, that: any): void {
    const view = that.map.getView();
    view.setCenter(ol.proj.fromLonLat([result.geometry.location.lng(), result.geometry.location.lat()]));
  }

  initMap(): void {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([19.057798, 47.4715964]),
        zoom: 17
      })
    });
  }

  showOnMap(event: any) {
    this.getLatitudeLongitude(this.setLongLat, event.target.innerHTML);
  }

  /* this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5
      };

      this.http.get('data/data.json')
        .map(this.extractData)
        .subscribe(events => {
          this.events = events;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });*/

  // kell OnDestroy interface implementálás
  /* ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }*/

  /*private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }*/

  /*private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }*/


}
