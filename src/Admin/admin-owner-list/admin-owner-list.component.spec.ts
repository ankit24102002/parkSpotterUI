import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOwnerListComponent } from './admin-owner-list.component';

describe('AdminOwnerListComponent', () => {
  let component: AdminOwnerListComponent;
  let fixture: ComponentFixture<AdminOwnerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOwnerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOwnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
