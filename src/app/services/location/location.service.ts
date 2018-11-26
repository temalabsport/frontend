import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  KEY = '2z7WMJoFPeosZclmyTubXvmN206ulGxH';

  constructor(private http: HttpClient) {
    // this.geocoder = new google.maps.Geocoder();
   // this.geocoder = globals.geocoder;
  }

  /*geocodeAddress(address, callback, context): void {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    const that = this;
    if (this.geocoder) {
      this.geocoder.geocode(
        {
          address: address
        },
        function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            const longitude = results[0].geometry.location.lng();
            const latitude = results[0].geometry.location.lat();
            callback({ longitude: longitude, latitude: latitude }, context);
          }
        }
      );
    }
  }*/

  getLatLongFromAddress(address) {
    return this.http
      .get<any>(
        'http://open.mapquestapi.com/geocoding/v1/address?key=' + this.KEY + '&location=' +
          address
      );
  }
}
