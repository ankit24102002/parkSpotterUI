import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "../Services-Customer/auth.service";
import { of } from "rxjs";

const ankit = new AuthService;

export const canActivateTeam: CanActivateFn = (
  
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {

  if (!ankit.checktoker()) {
    alert("Log in first!")
    inject(Router).navigate(['/login']);
    return false;
  } else {
    const parsedRole = parseInt(ankit.getrole() || '0');
    if (isNaN(parsedRole)) {
      console.error('Invalid role format in local storage. Expected a number.');
      return false;
    }
    return of(parsedRole === 1 || parsedRole === 2 || parsedRole === 3);

  }
};














