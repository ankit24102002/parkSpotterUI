import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../Common/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  
 baseUrl: string = environment.baseUrl;
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      Username: username,
      Password: password
    };
    return this.http.post<any>(`${this.baseUrl}User/Login`, body, { headers: headers });
   // return this.http.post<any>('https://localhost:7057/User/Login', body, { headers: headers });
  }

  openSnackBar(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

}
