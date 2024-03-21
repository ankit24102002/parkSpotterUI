
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../Services-Customer/localstorage.service';
import { AuthService } from '../../Services-Customer/auth.service';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";

@Component({
  selector: 'app-customer-navbar',
  standalone: true,
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.scss',
  imports: [CapitalizePipe]
})
export class CustomerNavbarComponent implements OnInit {
  constructor(private localStorageService: LocalstorageService, private router: Router, private auth: AuthService,) {
  }
  showFiller = false;
  keyvalue: any;
  ngOnInit(): void {
    this.keyvalue = this.auth.getusername();
  }

  onLogOut() {
    this.localStorageService.deletekeyFromLocalStorage('username',);
    this.localStorageService.deletekeyFromLocalStorage('token',);
    this.localStorageService.deletekeyFromLocalStorage('role',);
    this.router.navigateByUrl('/login');
  }

  profile() {
    this.router.navigateByUrl('/profileedit');
  }

  CurrentAndPastbooking() {
    this.router.navigateByUrl('/mybooking');
  }

  contactus() {
    this.router.navigateByUrl('/ContastUs');
  }
  
  home() {
    this.router.navigateByUrl('/homecustomer');
  }

}


