import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// export class FileUploadService {


//   private baseUrl = 'https://localhost:7057/Admin/Upload'; 

//   constructor(private http: HttpClient) { }

//   upload(file: File): Observable<any> {
//     const formData: FormData = new FormData();
//     formData.append('file', file, file.name);
    
//     return this.http.post(this.baseUrl, formData, {
//       reportProgress: true,
//       observe: 'events'
//     })
//   }

 
// }


export class FileUploadService {

  private baseUrl = 'https://localhost:7057/Admin/Upload'; 

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    
    return this.http.post(this.baseUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          // Handle upload progress event
          const progress = Math.round(100 * event.loaded / event.total);
          return { type: 'progress', progress: progress };
        } else if (event.type === HttpEventType.Response) {
          // Handle response event
          return event.body;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle error event
        if (error.status === 400 && error.error && error.error.Errors) {
          return throwError(error.error.Errors);
        } else {
          return throwError('An unexpected error occurred.');
        }
      })
    );
  }
}