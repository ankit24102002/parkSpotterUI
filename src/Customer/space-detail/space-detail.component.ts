import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { SpacedetailService } from '../../Services-Customer/spacedetail.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomerNavbarComponent } from "../customer-navbar/customer-navbar.component";
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { environment } from '../../Common/environment';
import { StarRatingComponent } from "../../Modules/star-rating/star-rating.component";

@Component({
  selector: 'app-space-detail',
  standalone: true,
  templateUrl: './space-detail.component.html',
  styleUrl: './space-detail.component.scss',
  imports: [CommonModule, MatTooltipModule, MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule,
    MatButtonModule, MatTooltipModule, CustomerNavbarComponent, CapitalizePipe, StarRatingComponent]
})
export class SpaceDetailComponent implements OnInit {
  //id: any;
 // ids: any;
  //isAvailabledate: boolean = false;
  //changedEndDate: Date | null = null;
    //utcTimeFromBackend!: string;
  //ISTdate: string = '';
  
  userData: UserData[] = [];
  isAvailable: boolean = false;
  changedEndDateString: string | null = null;
  utcDateTime: string = '';


  constructor( private datePipe: DatePipe, private route: ActivatedRoute, private detailServicecomponent: SpacedetailService, private router: Router) {
  }

  param1: number | null = null;
  param2: number | null = null;
  param3: number | null = null;
  param4: number | null = null;
  basePath = environment.basePath;



  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const param1String = params.get('param1');
      const param2String = params.get('param2');
      const param3String = params.get('param3');
      const param4String = params.get('param4');
      this.param1 = param1String ? +param1String : null;
      this.param2 = param2String ? +param2String : null;
      this.param3 = param3String ? +param3String : null;
      this.param4 = param4String ? +param4String : null;

    });

    if (this.param1 !== null) {
      this.detailServicecomponent.postData(this.param1).subscribe((data: any) => {

        this.userData = data;
        const endDate = this.userData[0].enddate

        const originalDate = new Date(endDate);
        let timeToAdd: number = (5 * 60 * 60 * 1000) + (30 * 60 * 1000);
        let changedEndDate: Date = new Date(originalDate.getTime() + timeToAdd);

       this.changedEndDateString=changedEndDate.toString();

        const currentDate = new Date();
     
        this.utcDateTime = currentDate.toISOString();

        const changedenddate = endDate.toString();

        const formattedCurrentDateTime = this.utcDateTime;

        this.isAvailable = changedenddate < formattedCurrentDateTime;

     
        console.log(changedEndDate)

      });
    } else {
      console.error('param1 is null. Skipping postData call.');
    }
  }




  redirectToMap(latitude: number, longitude: number): void {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');

  }

  getCurrentDateTime(): Date {
    return new Date();
  }

  formatDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss') || '';
  }

  ondetailClick(user: UserData) {
    const dataToSend = {
      spaceID: user.spaceID,
      pricePerDay: ((this.param4 !== null && user.price !== null) ? (this.param4 + user.price) / 2 : null)
    };
    this.router.navigate(['/booking/'], { queryParams: dataToSend });
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}


export interface UserData {
  spaceID: number;
  username: string;
  roleID: number;
  longitude: number;
  latitude: number;
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
  enddate: Date;
  email: string;
  phoneno: string

}