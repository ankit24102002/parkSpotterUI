import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurPasBookingService {

  private bookings: Booking[] = [
    { id: 1, name: 'Booking 1', date: new Date('2024-02-24') },
    { id: 2, name: 'Booking 2', date: new Date('2024-02-18') },
    { id: 3, name: 'Booking 3', date: new Date('2024-02-28') },
    { id: 3, name: 'Booking 3', date: new Date('2024-02-17') },

  ];

  constructor() { }

  getCurrentBookings(): Observable<Booking[]> {
    const currentDate = new Date();
    const currentBookings = this.bookings.filter(booking => booking.date >= currentDate);
    return of(currentBookings);
  }

  getPastBookings(): Observable<Booking[]> {
    const currentDate = new Date();
    const pastBookings = this.bookings.filter(booking => booking.date < currentDate);
    return of(pastBookings);
  }
}

interface Booking {
  id: number;
  name: string;
  date: Date;
}