import { TestBed } from '@angular/core/testing';

import { CurPasBookingService } from './cur-pas-booking.service';

describe('CurPasBookingService', () => {
  let service: CurPasBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurPasBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
