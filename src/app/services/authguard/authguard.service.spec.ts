import { TestBed } from '@angular/core/testing';

import { AuthguardService } from './authguard.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [AuthguardService],
    imports: [HttpClientModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: AuthguardService = TestBed.get(AuthguardService);
    expect(service).toBeTruthy();
  });
});
