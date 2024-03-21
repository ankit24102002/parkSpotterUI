import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../Services-Customer/login.service';

import ValidateForm from '../Helper/ValidateForm';
import { AuthService } from '../Services-Customer/auth.service';
import { ResetPasswordService } from '../Services-Common/reset-password.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  public restPasswordEmail!: string;
  public isValidEmail!: boolean;
  username: string = '';
  password: string = '';
  loginForm!: FormGroup;
  resetForm!: FormGroup;
  email: string = '';

  constructor(private resetservice: ResetPasswordService, private loginService: LoginService, private router: Router, private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.resetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  tosignup() {
    this.router.navigateByUrl('/signup')
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loginService.login(this.username, this.password).subscribe((res: any) => {
        if (res.roleid == 1) {
          this.auth.storeToken(res.token);
          this.auth.storerole(res.roleid);
          this.auth.storeUsername(res.username);
          this.loginService.openSnackBar(' Login Sucess');
          this.router.navigateByUrl('/homeAdmin')
        }
        else {
          if (res.roleid == 2) {
            this.auth.storeToken(res.token);
            this.auth.storerole(res.roleid);
            this.auth.storeUsername(res.username);
            this.loginService.openSnackBar(' Login Sucess');
            this.router.navigateByUrl('/homespaceowner')
          }
          else {
            if (res.roleid == 3) {
              this.auth.storeToken(res.token);
              this.auth.storerole(res.roleid);
              this.auth.storeUsername(res.username);
              this.loginService.openSnackBar(' Login Sucess');
              this.router.navigateByUrl('/homecustomer')
            }
            else {
              this.loginService.openSnackBar(res.message);
            }
          }
        }
      }
      );

    } else {

      //throw error with toster nd required feild
      ValidateForm.validateAllFormFeild(this.loginForm);
      this.loginService.openSnackBar('Form is invalid');


    }

  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if (this.resetForm.valid) {
      console.log('email:', this.email);
      this.resetservice.sendResetPasswordLink(this.email).subscribe({
        next: (res) => {
          this.loginService.openSnackBar('Sucess');
          this.restPasswordEmail = "";
          const buttonRef = document.getElementById("closebtn");
          buttonRef?.click();
        },
        error: (err) => {
          if (err.status === 404) {
            this.loginService.openSnackBar("Email doesn't exist");
          } else {
            this.loginService.openSnackBar("Error");
          }
        }
      })
    }else {
     ValidateForm.validateAllFormFeild(this.resetForm);
      this.loginService.openSnackBar("Your Form is invalid");
   }
  }
}


