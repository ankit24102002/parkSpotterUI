import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../Common/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private auth: AuthService, ) {
  }

  baseUrl: string = environment.baseUrl;

  booking(spaceid: number, username: string, booking_amount: number, startBooking: Date, endBooking: Date,paymentId:string): Observable<any> {
    const token = this.auth.gettoken(); 
    const Username = this.auth.getusername(); 
    const headers = new HttpHeaders({
    //  Authorization: `Bearer ${token}`,
    //  Username:`${Username}`,
    });
  

    const body = {
      Username: username,
      Booking_amount: booking_amount,
      SpaceID: spaceid,
      StartBooking: startBooking,
      EndBooking: endBooking,
      PaymentId:paymentId
    };
    
    return this.http.post<any>(`${this.baseUrl}Space/CustomerDoBooking`, body, { headers: headers });
  }


  openSnackBar(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
