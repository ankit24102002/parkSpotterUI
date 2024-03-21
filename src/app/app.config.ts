import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '../Interseptor/token.interceptor';
// import { tokenInterceptor } from '../Interseptor/token.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimations()
    ,  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};

//   , provideHttpClient(withInterceptors([tokenInterceptor]))]