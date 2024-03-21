import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRedirectComponent } from './map-redirect.component';

describe('MapRedirectComponent', () => {
  let component: MapRedirectComponent;
  let fixture: ComponentFixture<MapRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapRedirectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
