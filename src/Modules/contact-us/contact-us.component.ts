import { Component, OnInit } from '@angular/core';
import { CustomerNavbarComponent } from "../../Customer/customer-navbar/customer-navbar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../Services-Common/profile.service';
import { LoginService } from '../../Services-Customer/login.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import ValidateForm from '../../Helper/ValidateForm';
import { environment } from '../../Common/environment';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services-Customer/auth.service';
import { OwnerNavbarComponent } from "../../Owner/owner-navbar/owner-navbar.component";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  imports: [CustomerNavbarComponent, FormsModule, CommonModule, ReactiveFormsModule, OwnerNavbarComponent]
})
export class ContactUsComponent implements OnInit {
  contactform!: FormGroup;
  Q_Username: string = '';
  Q_Email: string = '';
  Q_Message: string = '';
  submitted = false;
  Username = this.auth.getusername();
  roleid!: number;

  baseUrl: string = environment.baseUrl;
  constructor(private usernameservice: ProfileService, private loginService: LoginService, private router: Router, private fb: FormBuilder, private http: HttpClient, private auth: AuthService,) { }

  ngOnInit(): void {
    const role = this.auth.getrole();
    if (role !== null) {
      this.roleid = parseInt(role, 10); // Convert string to number
    } else {
      this.roleid = 0; 
    }
    this.contactform = this.fb.group({
      Q_Username: ['', [Validators.required, Validators.minLength(3),]],
      Q_Email: ['', Validators.compose([Validators.required, Validators.email])],
      Q_Message: ['', [Validators.required,]],
      Username: [this.Username],
    })
  }

  submit() {
    this.submitted = true;
    if (this.contactform.valid) {
      const token = this.auth.gettoken();
      const Username = this.auth.getusername();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Username: `${Username}`,
      });

      this.http.post<any>(`${this.baseUrl}Admin/ContactUs`, this.contactform.value, { headers: headers }).subscribe(
        (response: any) => {
          if (response.result) {
            console.log(response.result)
            this.contactform.reset();
            this.loginService.openSnackBar('Request Successfull');
            if (this.roleid == 2) {
              this.router.navigateByUrl('/homespaceowner')
            } else {
              this.router.navigateByUrl('/homecustomer')
            }
          }
          else {
            this.loginService.openSnackBar(response.message);
          }
        });
    } else {
      this.contactform.markAllAsTouched();
      ValidateForm.validateAllFormFeild(this.contactform);
      this.loginService.openSnackBar(' Your Form is invalid');
    }
  }
}
