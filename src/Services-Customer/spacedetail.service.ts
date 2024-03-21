import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../Common/environment';

@Injectable({
  providedIn: 'root'
})
export class SpacedetailService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient , private auth: AuthService,){}
  postData(spaceID: number): Observable<any> {
    const token = this.auth.gettoken(); // Call outside the header
    const username = this.auth.getusername();
    const headers = new HttpHeaders({
      // Authorization: `Bearer ${token}`,
      // Username:`${username}`,
    });

    const url = `${this.baseUrl}Space/CustomerSpaceDetail?SpaceID=`+spaceID;
    return this.http.post<any>(url, '',{ headers: headers });
  }
}
