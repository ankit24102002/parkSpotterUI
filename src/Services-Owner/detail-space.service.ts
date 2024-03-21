import { Injectable } from '@angular/core';
import { environment } from '../Common/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../Services-Customer/auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DetailSpaceService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient , private auth: AuthService,){}
  postData(spaceID: number): Observable<any> {
    const token = this.auth.gettoken(); // Call outside the header
    const username = this.auth.getusername();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username:`${username}`,
    });
    const url = `${this.baseUrl}Owner/OwnerGetSpaceDetail?spaceid=`+spaceID;
    return this.http.post<any>(url, '',{ headers: headers });
  }
}