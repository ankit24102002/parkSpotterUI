import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-map-redirect',
  standalone: true,
  imports: [],
  templateUrl: './map-redirect.component.html',
  styleUrl: './map-redirect.component.scss'
})
export class MapRedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const latitude = params['latitude'];
      const longitude = params['longitude'];
      // Redirect to Google Maps with the specified coordinates
    //  window.location.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
    
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
    });
  }
}
