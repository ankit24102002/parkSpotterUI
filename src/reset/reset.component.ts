import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPassword, ResetPasswordService } from '../Services-Common/reset-password.service';
import ValidateForm, { confirmPasswordValidator } from '../Helper/ValidateForm';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../Services-Customer/login.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();
  passwordsDoNotMatch: boolean = false;

  constructor(private router: Router, private loginService: LoginService, private fb: FormBuilder, private activatedroute: ActivatedRoute, private resetService: ResetPasswordService) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword')
      });

    this.activatedroute.queryParams.subscribe(val => {
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g, '+');
      console.log(this.emailToReset)
      console.log(this.emailToken)
      this.reset();
    })

  }

  reset() {
    
    if (this.resetPasswordForm.valid) {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;
      this.resetService.resetPassword(this.resetPasswordObj)
        .subscribe({
          next: (res) => {
            this.loginService.openSnackBar(' password reset  Sucess');
            this.router.navigateByUrl('/login')
          },
          error: (err) => {
            this.loginService.openSnackBar('something went wrong');
          }
        })
    } else {
      
      ValidateForm.validateAllFormFeild(this.resetPasswordForm);
    }
  }
}

