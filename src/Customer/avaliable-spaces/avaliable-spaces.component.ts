import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from '../../Services-Customer/data.service';
import { CurrentLocationComponent } from '../../current-location/current-location.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../Services-Customer/auth.service';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { environment } from '../../Common/environment';
import { StarRatingComponent } from "../../Modules/star-rating/star-rating.component";

@Component({
  selector: 'app-avaliable-spaces',
  standalone: true,
  templateUrl: './avaliable-spaces.component.html',
  styleUrl: './avaliable-spaces.component.scss',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatCardModule,
    MatIconModule, NgxPaginationModule, FormsModule, CapitalizePipe, StarRatingComponent]
})
export class AvaliableSpacesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private dataServicecomponent: DataService, private router: Router,
    private currentLocationComponent: CurrentLocationComponent, private auth: AuthService,) { }

  selectedDistance: number = 2;
  selected: number = 1;
  //for card 
  Products: UserData[] = [];
  sortedData: UserData[] = [];
  p: number = 1;
  itemsPerPage: number = 8;
  totalProduct: any;
  Rate: any

  basePath = environment.basePath;
  baseUrl: string = environment.baseUrl;

  latitude: number = 0;
  longitude: number = 0;

  ngOnInit(): void {
    this.currentLocationComponent.getCurrentLocation().subscribe(
      (pos: any) => {
        this.latitude = pos.lat;
        this.longitude = pos.lng;
        this.fetchData(this.latitude, this.longitude);
      }
    )
  }

  errorMessage: string = '';

  fetchData(latitude: number, longitude: number): void {

    const token = this.auth.gettoken();
    const username = this.auth.getusername();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username: `${username}`,
    });

    this.auth.storelat(latitude);
    this.auth.storelon(longitude);

    const body = {
      
      Latitude: 29.5339371,
      Longitude: 75.0421599,

      // Latitude: latitude,
      // Longitude: longitude,
      Distance: +this.selectedDistance

    };

    this.http.post<any>(`${this.baseUrl}Space/GetLocationsWithin2km`, body, { headers: headers }).subscribe((data: any) => {
      //for card
      this.Products = data.spaces;
      this.totalProduct = data.length;
      this.Rate = data.price
      this.sortDataByDistance();

    },
      (error) => {
        if (error.status === 401) {
          this.router.navigateByUrl('/login');
          alert("Unaurthorized login first")
        } else if (error.status === 404) {
          this.errorMessage = "Internal server error. Please try again later.";
          console.error('Resource not found:', error);
        } else if (error.status === 500) {
          this.errorMessage = "Internal server error. Please try again later.";
          console.error('Server error:', error);
        } else {
          this.errorMessage = "An error occurred";
          console.error('An error occurred:', error);
        }
      }
    );
  }

  showResultBox: boolean = true;
  cornercss: boolean = true;
  searchInput: string = '';
  items: any[] = [];


  fetchDatageo() {
    this.http.get<any>(`https://geocode.maps.co/search?q=${this.searchInput}&api_key=65f420ca87c30844685951qlke910c7`).subscribe(data => {
      if (data.length === 0) {
        this.items = [{ display_name: "No result found" }];
      } else {

        this.items = data;
      }

      this.showResultBox = true
      this.cornercss = false;
    });
  }

  passLat(item: any) {
    console.log("Latitude:", item.lat);
    console.log("Latitude:", item.lon);

    this.latitude = item.lat;
    this.longitude = item.lon;
    this.fetchData(this.latitude, this.longitude);
  }

  selectInput(displayName: string) {
    this.searchInput = displayName;
    this.cornercss = false;

  }

  hideResultBox() {
    this.showResultBox = false;
    this.cornercss = false;
  }



  onDistanceChange() {
    //  this.ngOnInit();
    const latitudeString = this.auth.getlat() ?? '';
    const longitudeString = this.auth.getlon() ?? '';

    // Convert latitude and longitude strings to numbers
    const latitude = parseFloat(latitudeString);
    const longitude = parseFloat(longitudeString);
    this.fetchData(latitude, longitude);
  }



  sortDataByDistance() {
    this.sortedData = this.Products.slice().sort((a, b) => {
      return a.distance - b.distance;
    });
  }

  sortByPrice() {
    this.sortedData = this.Products.slice().sort((a, b) => {
      return a.price - b.price;
    });
  }

  onSelectionChange() {
    if (this.selected === 1) {
      this.sortDataByDistance();
    } else if (this.selected === 2) {
      this.sortByPrice();
    }
  }


  onButtonClick(user: UserData) {
    const dataToSend = user.spaceID;
    const dataToSends = user.averageRating;
    const dataToSendss = user.numberOfReviews;
    const adjustedprice = this.Rate;
    this.router.navigate(['/spacedetail/'], {
      queryParams: { param1: dataToSend, param2: dataToSends, param3: dataToSendss, param4: adjustedprice }
    });
  }
}

export interface UserData {
  spaceID: number;
  username: string;
  description: string;
  price: number;
  address_Appartment_no: string;
  address_street: string;
  address_District: string;
  space_Image_Path: string;
  distance: number;
  averageRating: number,
  numberOfReviews: number
}