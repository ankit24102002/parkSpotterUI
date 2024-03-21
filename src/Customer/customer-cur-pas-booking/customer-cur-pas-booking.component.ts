import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CurPasBookingService } from '../../Services-Customer/cur-pas-booking.service';

import { CustomerNavbarComponent } from "../customer-navbar/customer-navbar.component";
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { AuthService } from '../../Services-Customer/auth.service';
import { environment } from '../../Common/environment';
import { StarRatingComponent } from "../../Modules/star-rating/star-rating.component";

@Component({
    selector: 'app-customer-cur-pas-booking',
    standalone: true,
    templateUrl: './customer-cur-pas-booking.component.html',
    styleUrl: './customer-cur-pas-booking.component.scss',
    imports: [CommonModule, CustomerNavbarComponent, CapitalizePipe, StarRatingComponent]
})
export class CustomerCurPasBookingComponent implements OnInit {

  selectedOption: string;
  currentBookings: Booking[] = [];
  pastBookings: Booking[] = [];
  currentButtonActive: boolean = true;
  pastButtonActive: boolean = false;

  constructor(private bookingService: CurPasBookingService, private http: HttpClient,private auth: AuthService,) { 
    this.selectedOption = 'Active';
  }
  baseUrl: string = environment.baseUrl;
  data: any; 
  dynamicRating: any;
  ngOnInit(): void {
    this.data =  this.auth.getusername(); 
    this.getCurrentBookings(this.data);

  }

  getCurrentBookings(username: string,): void {
    const body = {
      Username:username,
      Enable: true,
    };
    const Username = this.auth.getusername(); 
    const token = this.auth.gettoken(); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username:`${Username}`,
     });

    this.http.post<any>(`${this.baseUrl}Space/CustomerCurPastBooking`, body,{ headers: headers }).subscribe(data => {
   //  this.currentBookings = data;
      
      this.currentBookings = data.sort((a:any, b:any) => new Date(b.endBooking).getTime() - new Date(a.endBooking).getTime());

    })
  }

  getPastBookings(username: string,): void {
    const body = {
      Username: username,
      Enable: false,
    };
    const token = this.auth.gettoken(); // Call outside the header
    const Username = this.auth.getusername(); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username:`${Username}`,
    });
    this.http.post<any>(`${this.baseUrl}Space/CustomerCurPastBooking`, body,{ headers: headers }).subscribe(data => {
    //  this.currentBookings = data;
      this.currentBookings = data.sort((a:any, b:any) => new Date(b.endBooking).getTime() - new Date(a.endBooking).getTime());
   
  
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
  



  onCurrentBookingsClick(): void {
    this.getCurrentBookings(this.data);
    this.currentButtonActive = true;
    this.pastButtonActive = false;
  }

  onPastBookingsClick(): void {
    this.getPastBookings(this.data);
    this.currentButtonActive = false;
    this.pastButtonActive = true;
  }

  onRatingSet(rating: number,spaceID: number,ratingid:number,bookingID:number) {
    console.log("Rating for SpaceID", spaceID, "set to", rating);
    const body = {
      Username: this.data,
      SpaceID:spaceID,
      Rating: rating,
      RatingID:ratingid,
      bookingID:bookingID
    };
    this.http.post<any>('https://localhost:7057/Review/Addrating', body).subscribe(response => {
     console.log(response.result)
    }, error => {
      console.error('Error saving rating:', error);
    });
  }
}

interface Booking {
  ownerUsername: string;
  spaceID: number;
  booking_amount: number;
  startBooking: Date;
  endBooking: Date;
  space_Image_Path: string;
  description: string;
  cEmail: string;
  cPhone_Number: string;
  customername: string;
  oEmail: string;
  oPhone_Number: string;
  appartmant:string;
  street: string;
  district: string;
  rating:number;
  ratingid:number;
  bookingid:number
}