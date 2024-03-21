import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableSpaceComponent } from './disable-space.component';

describe('DisableSpaceComponent', () => {
  let component: DisableSpaceComponent;
  let fixture: ComponentFixture<DisableSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisableSpaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisableSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
