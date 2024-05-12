import { CommonModule, DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookingService } from '../../Services-Customer/booking.service';
import { CustomerNavbarComponent } from '../customer-navbar/customer-navbar.component';
import { AuthService } from '../../Services-Customer/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  IgxIconModule,
  IgxInputGroupModule,
  IgxTimePickerModule,
} from 'igniteui-angular';
import { MatTooltipModule } from '@angular/material/tooltip';
declare var Razorpay: any;
@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    CustomerNavbarComponent,
    IgxTimePickerModule,
    IgxInputGroupModule,
    IgxIconModule,
    MatTooltipModule,
  ],
})
export class BookingComponent implements OnInit {
  minStartDate: Date;
  minEndDate: Date;
  id: any;
  price: any;
  data: any;
  startDate: Date = new Date();
  endDate: Date = new Date();
  fares: number = 0;
  fare: number = 0;
  diffTime: string = '0';
  paymentId:string=''

  //igx
  nextDayDateTime!: string;
  hoursDifference: number = 0;

  constructor(
    private datePipe: DatePipe,
    private auth: AuthService,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.minStartDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());
    this.minEndDate = tomorrow;
    this.endDate = tomorrow;

    //for time picker test
    this.dateTimeForm = new FormGroup({
      datePicker: new FormControl(),
      timePicker: new FormControl(),
    });

    // igx
    this.startTime = new Date();
    this.endTime = new Date();
  }

  // igx
  public startTime: Date = new Date();
  public endTime: Date = new Date();
  bookingDisabled: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['spaceID'];
      this.price = params['pricePerDay'];
      this.fares = this.price;
    });

    this.data = this.auth.getusername();
  }

  dateTimeForm: FormGroup;
  combinedDateTime: Date | null = null;
  formattedDateTime: string = '';

  // igx
  onEndTimeChanged(event: any) {
    if (this.startTime && this.endTime) {
      if (this.isPm(this.startTime) && !this.isPm(this.endTime)) {
        this.endTime.setDate(this.endTime.getDate() + 1);
      }

      this.validateEndTime(this.endTime);
      const differenceMs = this.endTime.getTime() - this.startTime.getTime();
      this.hoursDifference = differenceMs / (1000 * 60 * 60);

      //fare calculator
      if (this.startTime && this.endTime) {
        const startTime = new Date(this.startTime);
        const endTime = new Date(this.endTime);
        const diffTime = endTime.getTime() - startTime.getTime();
        // Convert milliseconds to hours and minutes
        const hours = Math.floor(diffTime / (1000 * 60 * 60));
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

        // Save the formatted time difference as a string
        this.diffTime = `${hours}h ${minutes}m`;

        const diffHours = diffTime / (1000 * 60 * 60);
        this.fare = diffHours * this.fares;
        this.fare = Math.round(this.fare * 100) / 100;
        console.log(`Calculated Fare: ${this.fare}`);
      }
    }

    if (this.endTime.getTime() == this.startTime.getTime()) {
      this.bookingDisabled = false;
    } else {
      this.bookingDisabled = true;
    }
  }

  // Function to check if a given time is PM
  isPm(time: Date): boolean {
    return time.getHours() >= 12;
  }

  validateEndTime(selectedTime: Date) {
    const currentTime = new Date();
    const oneHourLater = new Date(currentTime.getTime() + 60 * 60 * 1000); // Add 1 hour

    if (selectedTime <= currentTime) {
      this.endTime = this.startTime;
      alert('Please select a time that is ahead of the current time.');
    } else if (selectedTime <= oneHourLater) {
      this.endTime = this.startTime;
      alert(
        'Please select a time that is at least 1 hour ahead of the current time.'
      );
    } else {
      this.endTime = selectedTime;
    }
  }

  booking() {
    var RazorPayOptions = {
      description: '',
      currency: 'INR',
      amount: this.fare * 100,
      name: 'Park Spotter',
      key: 'rzp_test_gi3yWjpER0hcWe',
      handler: function (res: any, err: any) {},
      theme: {
        color: '#D58936',
      },
      modal: {
        confirm_close: true,
        ondismiss: () => {
          console.log('Popup closed');
        },
      },
    };
    RazorPayOptions.handler = (response: any, error: any) => {
      this.paymentId = response.razorpay_payment_id;
      console.log('After Modal');
      console.log('Starttime', this.startTime);
      console.log('Starttime', this.endTime);

      this.bookingService
        .booking(this.id, this.data, this.fare, this.startTime, this.endTime,this.paymentId)
        .subscribe((res: any) => {
          console.log("HEELLOOOOO")
          if (res.result) {
            console.log("HEELLOOOOO from result")
            this.router.navigateByUrl('/BookingSuccess')
            window.location.reload();
          console.log("HEELLOOOOO after routing")

          } else {
            this.bookingService.openSnackBar('booking failed ');
          }
        });
    };

    var rzp = new Razorpay.open(RazorPayOptions);
    rzp.on('payment.failed', function (response: any) {
      alert(response.error.description);
    });
  }
}
