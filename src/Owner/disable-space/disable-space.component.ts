import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../Services-Customer/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { OwnerNavbarComponent } from "../owner-navbar/owner-navbar.component";
import { LoginService } from '../../Services-Customer/login.service';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { environment } from '../../Common/environment';
import { StarRatingComponent } from "../../Modules/star-rating/star-rating.component";

@Component({
  selector: 'app-disable-space',
  standalone: true,
  templateUrl: './disable-space.component.html',
  styleUrl: './disable-space.component.scss',
  imports: [CommonModule, MatCardModule, NgxPaginationModule, OwnerNavbarComponent, CapitalizePipe, StarRatingComponent]
})
export class DisableSpaceComponent implements OnInit {

  constructor(private loginService: LoginService, private http: HttpClient, private auth: AuthService, private router: Router,) { }

  basePath = environment.basePath;
  baseUrl: string = environment.baseUrl;
  p: number = 1;
  itemsPerPage: number = 8;
  userData: UserData[] = [];
  token = this.auth.gettoken();
  username: any;

  ngOnInit(): void {
    this.username = this.auth.getusername();
    const url = `${this.baseUrl}Owner/OwnerAllSpace?username=` + this.username;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      Username: `${this.username}`,
    });

    this.http.post<any>(url, '', { headers: headers }).subscribe(data => {
      this.userData = data;
    }
    )
  }

  enable(space: UserData) {
    const dataToSend = space.spaceID;
    const token = this.auth.gettoken(); // Call outside the header
    const username = this.auth.getusername();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username: `${username}`,
    });
    this.http.post<any>(`${this.baseUrl}Owner/OwnerEnablespace?SpaceID=` + dataToSend, '', { headers: headers }).subscribe(data => {
      if (data.result) {
        this.ngOnInit();
        this.loginService.openSnackBar(data.message);
      } else {
        this.loginService.openSnackBar(data.message);
      }
    },
    )
  }

  disable(space: UserData) {
    const dataToSend = space.spaceID;
    const token = this.auth.gettoken(); // Call outside the header
    const username = this.auth.getusername();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username: `${username}`,
    });
    this.http.post<any>(`${this.baseUrl}Owner/OwnerDisablespace?SpaceID=` + dataToSend, '', { headers: headers }).subscribe(data => {
      if (data.result) {
        this.ngOnInit();
        this.loginService.openSnackBar(data.message);
      } else {
        this.loginService.openSnackBar(data.message);
      }
    },
    )
  }

  delete(space: UserData) {
    const dataToSend = space.spaceID;
    const token = this.auth.gettoken(); // Call outside the header
    const username = this.auth.getusername();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username: `${username}`,
    });
    this.http.post<any>(`https://localhost:7057/Owner/OwnerDeletespace?SpaceID=` + dataToSend, '', { headers: headers }).subscribe(data => {
      if (data.result) {
        this.ngOnInit();
        this.loginService.openSnackBar(data.message);

      } else {
        this.loginService.openSnackBar(data.message);
      }
    },
    )
  }

  Edit(space: UserData) {
    const dataToSend = space.spaceID;
    this.router.navigate(['/editspace/'], {
      queryParams: { param1: dataToSend, }
    });
  }
}

export interface UserData {
  spaceID: number;
  username: string;
  roleID: number;
  longitude: string;
  latitude: string;
  description: string;
  price: number;
  address_Appartment_no: string;
  address_street: string;
  address_District: string;
  enable: boolean;
  created_By: string;
  created_Date: Date;
  modified_By: string;
  modified_Date: Date;
  space_Image_Path: string;
  averageRating: number;
  numberOfUsers: number;
}

