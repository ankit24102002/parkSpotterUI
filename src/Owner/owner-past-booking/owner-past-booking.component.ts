import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OwnerNavbarComponent } from "../owner-navbar/owner-navbar.component";
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { AuthService } from '../../Services-Customer/auth.service';
import { environment } from '../../Common/environment';
import { StarRatingComponent } from "../../Modules/star-rating/star-rating.component";


@Component({
    selector: 'app-owner-past-booking',
    standalone: true,
    templateUrl: './owner-past-booking.component.html',
    styleUrl: './owner-past-booking.component.scss',
    imports: [CommonModule, OwnerNavbarComponent, CapitalizePipe, StarRatingComponent]
})
export class OwnerPastBookingComponent implements OnInit {

  constructor(private auth: AuthService, private http: HttpClient, private router: Router, ) { }
 
  baseUrl: string = environment.baseUrl;
  Products: UserData[] = [];
  totalProduct: any;
  basePath = environment.basePath;

  ngOnInit(): void {
    const body = {
      Username: this.auth.getusername(),
      Enable: false,
    };
    const token = this.auth.gettoken(); // Call outside the header
    const username = this.auth.getusername();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username: `${username}`,
    });
    const url = `${this.baseUrl}Owner/OwnerCurrentPastbooking`;
    this.http.post<any>(url, body, { headers: headers }).subscribe(data => {
      //for card
      // this.Products = data;
     this.Products = data.sort((a:any, b:any) => new Date(b.enddate).getTime() - new Date(a.enddate).getTime());

      this.totalProduct = data.length;
    })
  }

  
  getFormattedStartDate(startBooking: Date): string {
    // Parse the startBooking string to a Date object
    const startDate = new Date(startBooking);
  
    // Check if startDate is a valid Date object
    if (isNaN(startDate.getTime())) {
      console.error('Invalid date:', startBooking);
      return ''; // Or handle the error as needed
    }
  
    // Add 5 hours and 30 minutes to startBooking
    const adjustedStartDate = new Date(startDate.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));
  
    // Format adjustedStartDate as desired
    const formattedStartDate = adjustedStartDate.toString();
  
    return formattedStartDate;
  }
  
}
export interface UserData {
  spaceID: number;
  username: string;
  roleID: number;
  longitude: string;
  latitude: string;
  description: string;
  price: number;
  address_Appartment_no: string;
  address_street: string;
  address_District: string;
  enable: boolean;
  created_By: string;
  created_Date: Date;
  modified_By: string;
  modified_Date: Date;
  space_Image_Path: string;
  bookedamount: number,
  startdate: Date,
  c_email: string,
  enddate: Date,
  c_phoneno: string,
  c_username: string,
  rating:number,
   bookingid:number
}


