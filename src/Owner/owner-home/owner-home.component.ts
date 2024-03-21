import { Component, OnInit } from '@angular/core';
import { OwnerNavbarComponent } from "../owner-navbar/owner-navbar.component";
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { AuthService } from '../../Services-Customer/auth.service';
import { environment } from '../../Common/environment';

@Component({
    selector: 'app-owner-home',
    standalone: true,
    templateUrl: './owner-home.component.html',
    styleUrl: './owner-home.component.scss',
    imports: [OwnerNavbarComponent, CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, NgxPaginationModule, CapitalizePipe]
})

export class OwnerHomeComponent  implements OnInit {
    basePath = environment.basePath;
  constructor(private auth: AuthService,private http: HttpClient, private router: Router, ) { }
  //for card 
  Products: UserData[] = [];
  //for table
  userData: UserData[] = [];
  dataSource = new MatTableDataSource<UserData>(this.userData);
  displayedColumns: string[] = ['description', 'price', 'address_street', 'space_Image_Path', 'actions'];
  p: number = 1;
  itemsPerPage: number = 8;
  totalProduct: any;
  username: any;
  baseUrl: string = environment.baseUrl;

  
  ngOnInit(): void {
    
      const body = {
          Username: this.auth.getusername(),
          Enable: true,
         };

         const token = this.auth.gettoken();
         const username = this.auth.getusername();
         const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            Username:`${username}`,
           });
   
      const url = `${this.baseUrl}Owner/OwnerCurrentPastbooking` ;
      this.http.post<any>(url,body,{ headers: headers }).subscribe(data => {

          //for card
          this.Products = data;
          this.totalProduct = data.length;

          //for table
          this.userData = data;
          this.dataSource.data = this.userData;
      })
  }

  onButtonClick(user: UserData) {
      const dataToSend = user.spaceID;
      this.router.navigate(['/currentbooking/' + dataToSend]);
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
  bookedamount:  number;
  c_email:string;
  startdate: string;
  c_phoneno: string;
  enddate:string;
  c_username: string,
  rating:  number;
}
