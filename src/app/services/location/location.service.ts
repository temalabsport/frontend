import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  KEY = '2z7WMJoFPeosZclmyTubXvmN206ulGxH';

  constructor(private http: HttpClient) {

  }



  getLatLongFromAddress(address) {
    return this.http
      .get<any>(
        'http://open.mapquestapi.com/geocoding/v1/address?key=' + this.KEY + '&location=' +
          address
      );
  }
}
