import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClientModule } from '@angular/common/http';

describe('LocationService', () => {
  let service: LocationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationService],
      imports: [HttpClientModule]
    });

    service = TestBed.get(LocationService);
  });

  it('#getLatLongFromAddress should return geocoded address', (done: DoneFn) => {
    service.getLatLongFromAddress('Budapest, Hősök tere').subscribe(result => {
      expect(result.results[0].locations[0].latLng.lat).toBeGreaterThan(45);
      done();
    });


  });

});
