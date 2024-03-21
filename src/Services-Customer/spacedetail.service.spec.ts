import { TestBed } from '@angular/core/testing';

import { SpacedetailService } from './spacedetail.service';

describe('SpacedetailService', () => {
  let service: SpacedetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpacedetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
