import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CurrentLocationComponent } from '../../current-location/current-location.component';
import ValidateForm, { longitudeValidator, maxLengthValidator } from '../../Helper/ValidateForm';
import { OwnerNavbarComponent } from "../owner-navbar/owner-navbar.component";
import { LoginService } from '../../Services-Customer/login.service';
import { AuthService } from '../../Services-Customer/auth.service';
import { environment } from '../../Common/environment';
import { SpacedetailService } from '../../Services-Customer/spacedetail.service';
import { DetailSpaceService } from '../../Services-Owner/detail-space.service';

@Component({
  selector: 'app-edit-space',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, OwnerNavbarComponent],
  templateUrl: './edit-space.component.html',
  styleUrl: './edit-space.component.scss'
})
export class EditSpaceComponent implements OnInit {

  constructor(private detailServicecomponent: DetailSpaceService, private route: ActivatedRoute,private auth: AuthService,private loginService: LoginService,private fb: FormBuilder,
     private router: Router, private http: HttpClient, private currentLocationComponent: CurrentLocationComponent) {}
  
  submitted = false;
  username: any;
  editspaceForm!: FormGroup;
  longitude!: string ;
  latitude!: string;
  description: string = '';
  price!: number ;
  address_Appartment_no: string = '';
  address_street: string = '';
  address_District: string = '';
  space_Image_Path: string = '';
  baseUrl: string = environment.baseUrl;
  userData: UserData[] = [];
  param1: number | null = null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const param1String = params.get('param1');
      console.log('Received param1:', param1String);
      this.param1 = param1String ? +param1String : null;
      if (this.param1 !== null) {
      this.detailServicecomponent.postData(this.param1).subscribe(data => {
        // this.userData = data;
        this.editspaceForm.patchValue(data.detail[0]);
        console.log(data.de)
      }) } else {
        console.error('param1 is null. Skipping postData call.');
      }
    });

    this.editspaceForm = this.fb.group({
      longitude: ['', [Validators.required, longitudeValidator()]],
      latitude: ['', [Validators.required, longitudeValidator()]],
      description: ['',[Validators.required, maxLengthValidator(50)]],
      price:  [, [Validators.required, Validators.pattern('^-?[0-9]\\d*$')]],
      address_Appartment_no: ['', [Validators.required, maxLengthValidator(12)]],
      address_street: ['', [Validators.required, maxLengthValidator(12)]],
      address_District: ['',[Validators.required, maxLengthValidator(12)]],
      space_Image_Path: ['', Validators.required],
    })
  }

  saveChanges() {
    if (this.editspaceForm.valid) {
      const token = this.auth.gettoken();
      const username = this.auth.getusername();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Username: `${username}`,
      });

      const body = {
        SpaceID: this.param1,
        detail: this.editspaceForm.value
      };

      const url = `${this.baseUrl}Owner/UpdateSpace`;
      this.http.post<any>(url, body, { headers: headers }).subscribe(data => {
        this.loginService.openSnackBar(data.message);
        this.router.navigateByUrl('/homespaceowner')
      })
    }
    else {
      this.editspaceForm.markAllAsTouched();
      ValidateForm.validateAllFormFeild(this.editspaceForm);
      this.loginService.openSnackBar(' Your Form is invalid');
    }
  }
 
  get integerInput() {
    return this.editspaceForm.get('integerInput');
  }

  getCurrentLocation() {
    this.currentLocationComponent.getCurrentLocation().subscribe(
      (position: any) => {
        this.latitude = position.lat;
        this.longitude = position.lng;

        // Set latitude and longitude in the form
        this.editspaceForm.patchValue({
          latitude: this.latitude,
          longitude: this.longitude
        });
      },
      (error: any) => {
        console.error('Error getting location:', error);
      }
    );
  }

  cordinate() {
    this.getCurrentLocation();
  }
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
  email:string;
  phoneno:string

}
