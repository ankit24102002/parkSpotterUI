import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  token = this.auth.gettoken();
  postData() {
    const headers = new HttpHeaders({
    });
    return this.http.post<any>('https://localhost:7057/Space/CustomerGetAllSpaces', {}, { headers: headers });
  }
}


// export class MyApiService {

//   constructor(private http: HttpClient) { }

//   getData(): Observable<any> {
//     return this.http.get<any>('your/api/endpoint').pipe(
//       catchError(this.handleError)
//     );
//   }

//   private handleError(error: HttpErrorResponse) {
//     if (error.status === 401) {
//       // Handle unauthorized error (e.g., redirect to login page)
//     } else {
//       // Handle other errors (e.g., display error message)
//       console.error('An error occurred:', error.error.message || error.statusText);
//     }
//     // Return an observable with a user-facing error message
//     return throwError('Something bad happened; please try again later.');
//   }
// }