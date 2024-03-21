import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../../Services-Customer/auth.service';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { LocalstorageService } from '../../Services-Customer/localstorage.service';

@Component({
    selector: 'app-admin-navbar',
    standalone: true,
    templateUrl: './admin-navbar.component.html',
    styleUrl: './admin-navbar.component.scss',
    imports: [CapitalizePipe]
})
export class AdminNavbarComponent implements OnInit{
  
  constructor(private localStorageService:LocalstorageService,private router: Router,private auth: AuthService,){}
  keyvalue:any;
  ngOnInit(): void {
    this.keyvalue= this.auth.getusername(); 
  }
 
  onLogOut(){
    this.localStorageService.deletekeyFromLocalStorage('username',);
    this.localStorageService.deletekeyFromLocalStorage('token',);
    this.localStorageService.deletekeyFromLocalStorage('role',);
    this.router.navigateByUrl('/login');
  }
}
