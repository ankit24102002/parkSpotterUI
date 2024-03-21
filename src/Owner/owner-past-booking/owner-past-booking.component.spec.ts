import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPastBookingComponent } from './owner-past-booking.component';

describe('OwnerPastBookingComponent', () => {
  let component: OwnerPastBookingComponent;
  let fixture: ComponentFixture<OwnerPastBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerPastBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerPastBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
