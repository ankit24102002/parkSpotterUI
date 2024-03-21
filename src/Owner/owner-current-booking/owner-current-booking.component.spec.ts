import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCurrentBookingComponent } from './owner-current-booking.component';

describe('OwnerCurrentBookingComponent', () => {
  let component: OwnerCurrentBookingComponent;
  let fixture: ComponentFixture<OwnerCurrentBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerCurrentBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerCurrentBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
