import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../Services-Customer/login.service';
import { AuthService } from '../Services-Customer/auth.service';
import { LocalstorageService } from '../Services-Customer/localstorage.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerNavbarComponent } from '../Customer/customer-navbar/customer-navbar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DataService } from '../Services-Customer/data.service';
import { SpacedetailService } from '../Services-Customer/spacedetail.service';
import { BookingService } from '../Services-Customer/booking.service';
import { CurPasBookingService } from '../Services-Customer/cur-pas-booking.service';
import { OwnerNavbarComponent } from '../Owner/owner-navbar/owner-navbar.component';
import { AdminOwnerListComponent } from '../Admin/admin-owner-list/admin-owner-list.component';
import { AdminCustomerListComponent } from '../Admin/admin-customer-list/admin-customer-list.component';
import { AdminNavbarComponent } from '../Admin/admin-navbar/admin-navbar.component';
import { DatePipe } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { CurrentLocationComponent } from '../current-location/current-location.component';
import { GeocoderComponent } from '../geocoder/geocoder.component';
import { GeocodingService } from '../geocoder/geocoding.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { StarRatingComponent } from '../Modules/star-rating/star-rating.component';
import { ResetPasswordService } from '../Services-Common/reset-password.service';
import { ProfileEditComponent } from '../Modules/profile-edit/profile-edit.component';
import { ProfileService } from '../Services-Common/profile.service';
import { ContactUsComponent } from '../Modules/contact-us/contact-us.component';
import { DetailSpaceService } from '../Services-Owner/detail-space.service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [LoginService, AuthService, LocalstorageService, CustomerNavbarComponent, DataService, SpacedetailService, BookingService,
    CurPasBookingService, OwnerNavbarComponent, AdminOwnerListComponent, AdminCustomerListComponent, AdminNavbarComponent, DatePipe,
    CurrentLocationComponent, GeocodingService, StarRatingComponent, ResetPasswordService, ProfileEditComponent, ProfileService,
    ContactUsComponent, DetailSpaceService,
  ],
  //tokenInterceptor
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HttpClientModule, MatTableModule, MatSnackBarModule, MatCardModule, MatPaginatorModule, MatDatepickerModule,
    MatNativeDateModule, ToastrModule, CustomerNavbarComponent, GoogleMapsModule, FontAwesomeModule,
  ]
})
export class AppComponent {

  constructor(private router: Router) {
    
  }

  faCoffe = faCoffee;
  title = 'ParkSpotter';


}
