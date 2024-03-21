import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../Services-Customer/auth.service';
import { Observable, throwError } from 'rxjs';


import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../Services-Customer/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {



  excludedBaseUrl: string = 'https://geocode.maps.co/search';


  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar,

  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Check  excluded base URL
    if (request.url.startsWith(this.excludedBaseUrl)) {
      return next.handle(request);
    }

    const authToken = this.auth.gettoken();
    const Username = this.auth.getusername();
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        Username: `${Username}`,
      }
    });


    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.status === 401) {
          this.router.navigateByUrl('/login');
          this.openSnackBar('Unaurthorized login first');

        } else if (error.status === 404) {
          this.openSnackBar('Resource not found:. Please try again later.');
        } else if (error.status === 500) {
          this.openSnackBar('Internal server error. Please try again later.');
        } else {
          this.openSnackBar('An error occurred: Please try again later.');
          console.error('An error occurred:', error);
        }
        return throwError(errorMessage);
      })
    );
  }

  openSnackBar(message: string, action: string = 'Close', duration: number = 5000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }


}


