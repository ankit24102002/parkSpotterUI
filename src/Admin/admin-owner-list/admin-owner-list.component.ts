import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { AuthService } from '../../Services-Customer/auth.service';
import { LoginService } from '../../Services-Customer/login.service';

@Component({
    selector: 'app-admin-owner-list',
    standalone: true,
    templateUrl: './admin-owner-list.component.html',
    styleUrl: './admin-owner-list.component.scss',
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, NgxPaginationModule, CapitalizePipe]
})
export class AdminOwnerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private loginService: LoginService,private auth: AuthService, private router: Router,private http: HttpClient,){}
      //for table
      userData: UserData[] = [];
      dataSource = new MatTableDataSource<UserData>(this.userData);
      displayedColumns: string[] = ['serialNumber','Username', 'Email', 'Phoneno', 'State', 'Enable','Disable'];
    
  ngOnInit(): void {
  
  
    const body = {
     RoleID:2
     
     };

     const token = this.auth.gettoken();
     const username = this.auth.getusername();
     const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username:`${username}`,
     });
    this.http.post<any>('https://localhost:7057/Admin/AllUserList',body ,{ headers: headers }).subscribe((data:any) => {

     
         //for table
         this.userData = data;
         this.dataSource.data = this.userData;
         this.dataSource.paginator = this.paginator;
  
      })
  }
  
  
  enable(user: UserData) {

    const  body={
      Username: user.username,
        Enable: true,
    }
    const token = this.auth.gettoken();
    const username = this.auth.getusername();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Username:`${username}`,
     });
      this.http.post<any>('https://localhost:7057/Admin/EnableDisable',body,{ headers: headers }).subscribe(data => {
        if (data.message) {
          this.loginService.openSnackBar('enable');
this.ngOnInit();
         // alert("enable")
        }
      },
      )

  }

  disable(user: UserData) {
  const  body={
    Username: user.username,
      Enable: false,
  } 
  const token = this.auth.gettoken();
  const username = this.auth.getusername();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    Username:`${username}`,
   });
    this.http.post<any>('https://localhost:7057/Admin/EnableDisable',body,{ headers: headers }).subscribe(data => {
      if (data.message) {
        this.loginService.openSnackBar('disable');
        this.ngOnInit();
      //  alert("disable")
      }
    },
    )
  }
     
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
  export interface UserData {
   username: string;
   email: string;
   phoneno: string;
   enable: boolean;
  
  }
  