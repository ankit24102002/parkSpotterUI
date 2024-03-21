import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { CustomerHomeComponent } from '../Customer/customer-home/customer-home.component';
import { OwnerHomeComponent } from '../Owner/owner-home/owner-home.component';
import { SpaceDetailComponent } from '../Customer/space-detail/space-detail.component';
import { BookingComponent } from '../Customer/booking/booking.component';
import { OwnerCurrentBookingComponent } from '../Owner/owner-current-booking/owner-current-booking.component';
import { DisableSpaceComponent } from '../Owner/disable-space/disable-space.component';
import { AddSpacesComponent } from '../Owner/add-spaces/add-spaces.component';
import { OwnerPastBookingComponent } from '../Owner/owner-past-booking/owner-past-booking.component';
import { CustomerCurPasBookingComponent } from '../Customer/customer-cur-pas-booking/customer-cur-pas-booking.component';
import { AdminHomeComponent } from '../Admin/admin-home/admin-home.component';
import { BookingSuccessComponent } from '../Customer/booking-success/booking-success.component';
import { CurrentLocationComponent } from '../current-location/current-location.component';
import { GeocoderComponent } from '../geocoder/geocoder.component';
import { canActivateTeam } from '../gaurds/auth.guard';
import { StarRatingComponent } from '../Modules/star-rating/star-rating.component';
import { ResetComponent } from '../reset/reset.component';
import { ProfileEditComponent } from '../Modules/profile-edit/profile-edit.component';
import { MapRedirectComponent } from '../Modules/map-redirect/map-redirect.component';
import { ContactUsComponent } from '../Modules/contact-us/contact-us.component';
import { EditSpaceComponent } from '../Owner/edit-space/edit-space.component';
import { ErrorPageComponent } from '../Modules/error-page/error-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent, },
    { path: 'homecustomer', component: CustomerHomeComponent ,canActivate: [canActivateTeam]},
    { path: 'homeAdmin', component: AdminHomeComponent , canActivate: [canActivateTeam] , data: { role: 1 }},
    { path: 'homespaceowner', component: OwnerHomeComponent,canActivate: [canActivateTeam]  , data: { role: 2 }},
    { path: 'spacedetail', component: SpaceDetailComponent,canActivate: [canActivateTeam]  , data: { role: 3 }},
    { path: 'booking', component: BookingComponent,canActivate: [canActivateTeam]  , data: { role: 3 }},
    { path: 'currentbooking/:id', component: OwnerCurrentBookingComponent, canActivate: [canActivateTeam] , data: { role: 2 }},
    { path: 'disablebooking', component: DisableSpaceComponent ,canActivate: [canActivateTeam] , data: { role: 2 }},
    { path: 'addspace', component: AddSpacesComponent,canActivate: [canActivateTeam]  , data: { role: 2 }},
    { path: 'mybooking', component: CustomerCurPasBookingComponent,canActivate: [canActivateTeam] , data: { role: 2 } },
    { path: 'pastbooking', component: OwnerPastBookingComponent,canActivate: [canActivateTeam]  , data: { role: 2 }},
    { path: 'BookingSuccess', component: BookingSuccessComponent ,canActivate: [canActivateTeam] , data: { role: 1 }},
    { path: 'currentlocation', component: CurrentLocationComponent,canActivate: [canActivateTeam]  ,},
    { path: 'geocoder', component: GeocoderComponent ,canActivate: [canActivateTeam] ,},
    { path: 'starrating', component: StarRatingComponent },
    { path: 'reset', component: ResetComponent },
    { path: 'profileedit', component: ProfileEditComponent },
    { path: 'redirecttomap/:latitude/:longitude',component:MapRedirectComponent},
    { path: 'ContastUs',component:ContactUsComponent},
    { path: 'editspace',component:EditSpaceComponent},
    { path: 'error', component: ErrorPageComponent },
];

