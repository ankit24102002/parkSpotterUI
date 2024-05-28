import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CurrentLocationComponent } from '../../current-location/current-location.component';
import ValidateForm, {
  longitudeValidator,
  maxLengthValidator,
} from '../../Helper/ValidateForm';
import { OwnerNavbarComponent } from '../owner-navbar/owner-navbar.component';
import { LoginService } from '../../Services-Customer/login.service';
import { AuthService } from '../../Services-Customer/auth.service';
import { environment } from '../../Common/environment';
import { Console } from 'node:console';

@Component({
  selector: 'app-add-spaces',
  standalone: true,
  templateUrl: './add-spaces.component.html',
  styleUrl: './add-spaces.component.scss',
  imports: [ReactiveFormsModule, CommonModule, OwnerNavbarComponent],
})
export class AddSpacesComponent implements OnInit {
  submitted = false;
  selectedFile: File | null = null;

  constructor(
    private auth: AuthService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private currentLocationComponent: CurrentLocationComponent
  ) {}
  username: any;
  addspaceForm!: FormGroup;
  longitude!: number;
  latitude!: number;
  description: string = '';
  price!: number;
  address_Appartment_no: string = '';
  address_street: string = '';
  address_District: string = '';
  space_image: string = '';
  baseUrl: string = environment.baseUrl;

  ngOnInit(): void {
    this.username = this.auth.getusername();
    this.addspaceForm = this.fb.group({
      username: [this.username, Validators.required],
      longitude: ['', [Validators.required, longitudeValidator()]],
      latitude: ['', [Validators.required, longitudeValidator()]],
      description: ['', [Validators.required, maxLengthValidator(50)]],
      price: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*$')]],
      address_Appartment_no: [
        '',
        [Validators.required, maxLengthValidator(12)],
      ],
      address_street: ['', [Validators.required, maxLengthValidator(12)]],
      address_District: ['', [Validators.required, maxLengthValidator(12)]],
      space_image: ['', Validators.required],
    });
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
          longitude: this.longitude,
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

  onChangeFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.space_image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSignup() {
    this.submitted = true;
    if (this.addspaceForm.valid && this.selectedFile) {
      const token = this.auth.gettoken();
      const username = this.auth.getusername();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Username: `${username}`,
      });

      const formData = {
        username: this.addspaceForm.get('username')?.value,
        longitude: this.addspaceForm.get('longitude')?.value,
        latitude: this.addspaceForm.get('latitude')?.value,
        description: this.addspaceForm.get('description')?.value,
        price: this.addspaceForm.get('price')?.value,
        address_Appartment_no: this.addspaceForm.get('address_Appartment_no')?.value,
        address_street: this.addspaceForm.get('address_street')?.value,
        address_District: this.addspaceForm.get('address_District')?.value,
        space_image: this.space_image, // Base64 string of the image
      };

      this.http
        .post<any>(
          `${this.baseUrl}Owner/OwnerAddspace`,
          JSON.stringify(formData),
          { headers: headers }
        )
        .subscribe((response: any) => {
          if (response.result) {
            console.log(response.result);
            this.loginService.openSnackBar('Space Added');
            this.router.navigateByUrl('/homespaceowner');
          } else {
            this.loginService.openSnackBar('Failed');
          }
        });
    } else {
      ValidateForm.validateAllFormFeild(this.addspaceForm);
      this.loginService.openSnackBar('Form is invalid or file not selected');
    }
  }
}
