import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliableSpacesComponent } from './avaliable-spaces.component';

describe('AvaliableSpacesComponent', () => {
  let component: AvaliableSpacesComponent;
  let fixture: ComponentFixture<AvaliableSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliableSpacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvaliableSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
