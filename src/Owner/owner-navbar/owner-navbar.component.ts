import { Component, OnInit } from "@angular/core";
import { LocalstorageService } from "../../Services-Customer/localstorage.service";
import { Router } from "@angular/router";
import { AuthService } from "../../Services-Customer/auth.service";
import { CapitalizePipe } from "../../pipes/capitalize.pipe";

@Component({
  selector: 'app-owner-navbar',
  standalone: true,
  templateUrl: './owner-navbar.component.html',
  styleUrl: './owner-navbar.component.scss',
  imports: [CapitalizePipe]
})
export class OwnerNavbarComponent implements OnInit {
  
  constructor(private localStorageService: LocalstorageService, private router: Router, private auth: AuthService,) {}

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

  contactus() {
    this.router.navigateByUrl('/ContastUs');
  }
  ondisablespace() {
    this.router.navigateByUrl('/disablebooking');
  }

  addspace() {
    this.router.navigateByUrl('/addspace');
  }

  Ownerpastbooking() {
    this.router.navigateByUrl('/pastbooking')
  }

  home() {
    this.router.navigateByUrl('/homespaceowner')
  }
}

