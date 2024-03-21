import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerNavbarComponent } from "../owner-navbar/owner-navbar.component";
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { AuthService } from '../../Services-Customer/auth.service';
import { environment } from '../../Common/environment';

@Component({
  selector: 'app-owner-current-booking',
  standalone: true,
  templateUrl: './owner-current-booking.component.html',
  styleUrl: './owner-current-booking.component.scss',
  imports: [CommonModule, OwnerNavbarComponent, CapitalizePipe]
})
export class OwnerCurrentBookingComponent implements OnInit {

  id: any;
  userData: UserData[] = [];
  baseUrl: string = environment.baseUrl;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  basePath = environment.basePath;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    const token = this.auth.gettoken(); // Call outside the header
    const username = this.auth.getusername();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username: `${username}`,
    });
    const url = `${this.baseUrl}Owner/OwnerCurrentBookingDetail?SpaceID=` + this.id;
    this.http.post<any>(url, '', { headers: headers }).subscribe(data => {
      this.userData = data;
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

  disableClick(space: any) {
  }

}
export interface UserData {
  ownerUsername: string;
  spaceID: number;
  booking_amount: number;
  startBooking: Date;
  endBooking: Date;
  space_Image_Path: string;
  description: string;
  email: string;
  phone_Number: string;
  customername: string;
  appartmant: string;
  street: string;
  district: string;
  address_Appartment_no: string;
  address_street: string;
  address_District: string;
}