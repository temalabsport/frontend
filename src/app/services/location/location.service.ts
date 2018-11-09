import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  geocoder: any;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  geocodeAddress(address, callback, context): void {
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
            console.log(latitude);
            callback({longitude: longitude, latitude: latitude}, context);
          }
        }
      );
    }
  }
}
