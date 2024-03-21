import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ValidateForm, { mobileNumberValidator, passwordValidator, singleWordValidator } from '../Helper/ValidateForm';
import { LoginService } from '../Services-Customer/login.service';
import { environment } from '../Common/environment';
import { ProfileService } from '../Services-Common/profile.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  signUpForm!: FormGroup;
  submitted = false;


  username: string = '';
  email: string = '';
  phoneno: string = '';
  password: string = '';
  rolename: string = '';

  baseUrl: string = environment.baseUrl;
  constructor(private usernameservice: ProfileService, private loginService: LoginService, private router: Router, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), singleWordValidator]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phoneno: ['', Validators.compose([Validators.required, mobileNumberValidator()])],
      password: ['', [Validators.required, passwordValidator()]],
      rolename: ['', [Validators.required,]]
    })
  }

  onLogin() {
    this.router.navigateByUrl('/login')
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  noteColor: string = '';
  note: string | null = null;
  suggestedUsername: string = '';

  searchUsernames(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usernameservice.getSuggestedUsernames(filterValue).subscribe({
      next: (data: any) => {
        this.suggestedUsername = data.detail;
        this.note = this.validateUsername(this.suggestedUsername, filterValue);
      },
      error: (error: any) => {
        console.error('Error getting suggested usernames:', error);
      }
    });
  }

  validateUsername(username: string, filterValue: string,): string {
    if (filterValue.length < 4) {
      this.noteColor = 'blue';
      this.note = null;
      return "";
    }
    else if (username === filterValue) {
      this.noteColor = 'green';
      this.note = "This is a valid username.";
    } else {
      this.noteColor = 'red';
      this.note = "This name already exists. Please try this";
    }
    return this.note;
  }

  onSignup() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      this.http.post<any>(`${this.baseUrl}User/SignUp`, this.signUpForm.value, { headers: headers }).subscribe(
        (response: any) => {
          if (response.result) {
            console.log(response.result)
            this.loginService.openSnackBar('Sign Up Successfull');
            this.router.navigateByUrl('/login')
          }
          else {
            console.log(response.result)
            console.log(response.message)
            this.loginService.openSnackBar(response.message);
            // alert(response.message)
          }
        });
    } else {
      //throw error with toster nd required feild
      this.signUpForm.markAllAsTouched();
      ValidateForm.validateAllFormFeild(this.signUpForm);
      this.loginService.openSnackBar(' Your Form is invalid');

    }
  }

}
