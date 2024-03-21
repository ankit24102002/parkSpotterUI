import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-current-location',
  standalone: true,
  imports: [],
  templateUrl: './current-location.component.html',
  styleUrl: './current-location.component.scss'
})
export class CurrentLocationComponent implements OnInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  map!: google.maps.Map;

  constructor() { }

  ngOnInit(): void {
   this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: 0, lng: 0 }, // Default center
      zoom: 10 // Default zoom level
    });
  }

  getCurrentLocation(): Observable<any>  {
    const locationSubject = new Subject<any>();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          // this.map.setCenter(pos);
          // console.log(pos);
          locationSubject.next(pos); // Emit the position
          locationSubject.complete(); // Complete the observable
          this.displayCoordinates(pos);
          // Add a marker at the user's current location
          // const marker = new google.maps.Marker({
          //   position: pos,
          //   map: this.map,
          //   title: 'Your Location'
          // });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
    return locationSubject.asObservable();
  }

  displayCoordinates(pos: { lat: number, lng: number }) {
    const coordinatesDiv = document.getElementById('coordinates');
    if (coordinatesDiv) {
      coordinatesDiv.innerHTML = 'Latitude: ' + pos.lat + ', Longitude: ' + pos.lng;
    }
  }
}