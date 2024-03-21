import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCurPasBookingComponent } from './customer-cur-pas-booking.component';

describe('CustomerCurPasBookingComponent', () => {
  let component: CustomerCurPasBookingComponent;
  let fixture: ComponentFixture<CustomerCurPasBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCurPasBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerCurPasBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
