import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CurrentLocationComponent } from '../../current-location/current-location.component';
import ValidateForm, { longitudeValidator, maxLengthValidator } from '../../Helper/ValidateForm';
import { OwnerNavbarComponent } from "../owner-navbar/owner-navbar.component";
import { LoginService } from '../../Services-Customer/login.service';
import { AuthService } from '../../Services-Customer/auth.service';
import { environment } from '../../Common/environment';
import { Console } from 'console';

@Component({
    selector: 'app-add-spaces',
    standalone: true,
    templateUrl: './add-spaces.component.html',
    styleUrl: './add-spaces.component.scss',
    imports: [ReactiveFormsModule, CommonModule, OwnerNavbarComponent]
})
export class AddSpacesComponent implements OnInit {

  submitted = false;

  constructor( private auth: AuthService,private loginService: LoginService,private fb: FormBuilder, private router: Router, private http: HttpClient,  private currentLocationComponent: CurrentLocationComponent) {

   }
  username: any;
  addspaceForm!: FormGroup;
  longitude!: number ;
  latitude!: number;
  description: string = '';
  price!: number ;
  address_Appartment_no: string = '';
  address_street: string = '';
  address_District: string = '';
  space_Image_Path: string = '';
  baseUrl: string = environment.baseUrl;

  ngOnInit(): void {

    this.username = this.auth.getusername();
    this.addspaceForm = this.fb.group({
     username: [this.username, Validators.required],
      longitude: ['', [Validators.required, longitudeValidator()]],
      latitude: ['', [Validators.required, longitudeValidator()]],
      description: ['',[Validators.required, maxLengthValidator(50)]],
      price:  ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*$')]],
      address_Appartment_no: ['', [Validators.required, maxLengthValidator(12)]],
      address_street: ['', [Validators.required, maxLengthValidator(12)]],
      address_District: ['',[Validators.required, maxLengthValidator(12)]],
      space_Image_Path: ['', Validators.required],
    })
  }

  get integerInput() {
    return this.addspaceForm.get('integerInput');
  }

  getCurrentLocation() {
    this.currentLocationComponent.getCurrentLocation().subscribe(
      (position: any) => {
        this.latitude = position.lat;
        this.longitude = position.lng;
        this.addspaceForm.patchValue({
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
  
  onChangeFile(event : any){
    if(event.target.files){
      var reader = new FileReader;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any)=>{
        this.space_Image_Path=event.target.result;
        console.log(this.space_Image_Path);
      }
    }
  }  
  
  onSignup() {
    this.submitted = true;
    if (this.addspaceForm.valid) {
      const token = this.auth.gettoken(); // Call outside the header
      const username = this.auth.getusername();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Username:`${username}`,
      });
    this.http.post<any>(`${this.baseUrl}Owner/OwnerAddspace`, this.addspaceForm.value, { headers: headers }).subscribe(
      (response: any) => {
        if (response.result) {
          console.log(response.result)
          this.loginService.openSnackBar(' Space Added');
          this.router.navigateByUrl('/homespaceowner')
        } else {
          this.loginService.openSnackBar('Failed');
        }
      });
    } else {
      ValidateForm.validateAllFormFeild(this.addspaceForm);
      this.loginService.openSnackBar('Form is invalid');
    }
  }
}
