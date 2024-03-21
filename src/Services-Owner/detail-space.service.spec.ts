import { TestBed } from '@angular/core/testing';

import { DetailSpaceService } from './detail-space.service';

describe('DetailSpaceService', () => {
  let service: DetailSpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailSpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
