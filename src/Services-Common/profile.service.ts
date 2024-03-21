import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Common/environment';
import { AuthService } from '../Services-Customer/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.baseUrl;
  constructor(private auth: AuthService, private http: HttpClient, ) { }

  getSuggestedUsernames(input: string): Observable<string[]> {
    const token = this.auth.gettoken();
    const username = this.auth.getusername();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username: `${username}`,
    });
    body: {
      input: input;
    }
    const url = `${this.baseUrl}User/GetSuggestedUsernames?input=${input}`;
    return this.http.post<string[]>(url, { input }, { headers });
  }
}
