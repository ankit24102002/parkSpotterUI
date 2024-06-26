import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpaceComponent } from './edit-space.component';

describe('EditSpaceComponent', () => {
  let component: EditSpaceComponent;
  let fixture: ComponentFixture<EditSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSpaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
