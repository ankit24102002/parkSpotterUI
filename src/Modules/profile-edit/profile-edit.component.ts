import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerNavbarComponent } from "../../Customer/customer-navbar/customer-navbar.component";
import { AuthService } from '../../Services-Customer/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../Common/environment';

import { Router } from '@angular/router';
import { ProfileService } from '../../Services-Common/profile.service';
import ValidateForm, { mobileNumberValidator, singleWordValidator } from '../../Helper/ValidateForm';
import { LoginService } from '../../Services-Customer/login.service';
import { OwnerNavbarComponent } from "../../Owner/owner-navbar/owner-navbar.component";

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
  imports: [CommonModule, ReactiveFormsModule, CustomerNavbarComponent, OwnerNavbarComponent]
})
export class ProfileEditComponent implements OnInit {

  myForm!: FormGroup;
  isEditable: boolean = false;
  baseUrl = environment.baseUrl;
  roleid!: number;

  constructor(private loginService: LoginService, private usernameservice: ProfileService, private fb: FormBuilder, private auth: AuthService,
     private http: HttpClient, private router: Router,) { }

  ngOnInit() {
    const role = this.auth.getrole();
    if (role !== null) {
      this.roleid = parseInt(role, 10);
    } else {
      this.roleid = 0;
    }
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), singleWordValidator,]],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required, mobileNumberValidator()]]
    });
    this.fetchDataAndSetFormValues();
  }

  fetchDataAndSetFormValues() {
    const body = {
      Username: this.auth.getusername(),
      Enable: true,
    };

    const token = this.auth.gettoken();
    const username = this.auth.getusername();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username: `${username}`,
    });

    const url = `${this.baseUrl}User/Profiledata`;
    this.http.post<any>(url, body, { headers: headers }).subscribe(data => {
      this.myForm.patchValue(data.detail);
    })
  }

  toggleEdit() {
    this.isEditable = true;
  }

  saveChanges() {
    if (this.myForm.valid) {
      const token = this.auth.gettoken();
      const username = this.auth.getusername();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Username: `${username}`,
      });

      const body = {
        Username: this.auth.getusername(),
        detail: this.myForm.value
      };

      const url = `${this.baseUrl}User/UpdateProfiledata`;
      this.http.post<any>(url, body, { headers: headers }).subscribe(data => {
        this.loginService.openSnackBar(data.message);
      })

      this.isEditable = false;
    }
    else {
      this.myForm.markAllAsTouched();
      ValidateForm.validateAllFormFeild(this.myForm);
      this.loginService.openSnackBar(' Your Form is invalid');
    }
  }
  
  showAlert() {
    this.loginService.openSnackBar("Can't Edit");
  }
}