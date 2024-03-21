import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
private baseUrl:string="https://localhost:7057/User/SendEmail"
  constructor(private http:HttpClient) { }

  sendResetPasswordLink(email:string){
    return this.http.post<any>(`${this.baseUrl}/send-reset-email/${email}`,{})
  }

  resetPassword(resetPasswordobj:ResetPassword){
    return this.http.post<any>(`https://localhost:7057/User/ResetPassword/reset-password`,resetPasswordobj);
  }
}

export class ResetPassword{
  public email!:string;
  public emailToken!:string;
  public newPassword!:string;
  public confirmPassword!:string;
}
