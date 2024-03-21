import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface GeocoderResponse {
  results: { geometry: { location: { lat: number; lng: number } } }[];
}

@Component({
  selector: 'app-geocoder',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './geocoder.component.html',
  styleUrl: './geocoder.component.scss'
})
export class GeocoderComponent  {
  

  showResultBox: boolean = true;
  searchInput: string = '';
  items: any[] = [];

  constructor(private http: HttpClient) {

  }
  fetchData() {
    this.http.get<any>(`https://geocode.maps.co/search?q=${this.searchInput}&api_key=65f420ca87c30844685951qlke910c7`).subscribe(data => {
      this.items = data;
    });
  }


  passLat(item: any) {
    // Do whatever you want with the lat value here
    console.log("Latitude:", item.lat);
    console.log("Latitude:", item.lon);
    // You can call any function passing lat as an argument here
}

selectInput(displayName:string){
 this.searchInput=displayName;

}

// Function to hide the result box
hideResultBox() {
  this.showResultBox = false;
}
}







//try 2
// address: string = '';
//   latitude: number;
//   longitude: number;
//   showDropdown: boolean = false;


//   constructor(private http: HttpClient) {
//     this.latitude = 0;
//     this.longitude = 0;
//   }

//   //displayName: string = '';
//   searchInput: string = '';
//   items: any[] = [];


//   fetchData() {
//     this.http.get<any>(`https://geocode.maps.co/search?q=${this.searchInput}&api_key=65f420ca87c30844685951qlke910c7`).subscribe(data => {
//       this.items = data;
//     });
//   }


//   selectLocation(item: any) {
//     console.log(item);
//   }
//   onDropdownClick(event: Event) {
//     event.stopPropagation(); // Prevents the click event from bubbling up to document
//   }

//   @HostListener('document:click', ['$event'])
//   onClick(event: MouseEvent) {
//     if (!this.showDropdown) {
//       return;
//     }

//     const target = event.target as HTMLElement;
//     if (!target.closest('.dropdown')) {
//       this.showDropdown = false;
//     }
//   }




  








//try 1


//   geocodeAddress() {
//     const geocoderUrl = `https://geocode.maps.co/search?q=${this.address}&api_key=65f420ca87c30844685951qlke910c7`;
//    // const geocoderUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&key=AIzaSyBUSUB41sM6LfwtJkSTHaBv1BDQlylz0xU`; // Replace with your API key

//    // const geocoderUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&key=AIzaSyCwkSZ_4Zp2GgYbBuKLmesf_QRJDrL5PXc`; // Replace with your API key
//     this.http.get<GeocoderResponse>(geocoderUrl)
//       .subscribe(response => {
        
//         if (response.results && response.results.length > 0) {
//           const location = response.results[0].geometry.location;
//           this.latitude = location.lat;
//           this.longitude = location.lng;
//           console.log(this.longitude)
//           console.log(this.latitude)
//         } else {
// console.log(response)
//         }
//       });
//   }





