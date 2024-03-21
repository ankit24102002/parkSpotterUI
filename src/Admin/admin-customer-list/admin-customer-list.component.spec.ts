import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerListComponent } from './admin-customer-list.component';

describe('AdminCustomerListComponent', () => {
  let component: AdminCustomerListComponent;
  let fixture: ComponentFixture<AdminCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCustomerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
