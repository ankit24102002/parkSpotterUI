// import { Component } from '@angular/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { AdminCustomerListComponent } from "../admin-customer-list/admin-customer-list.component";
// import { AdminOwnerListComponent } from "../admin-owner-list/admin-owner-list.component";
// import { CommonModule } from '@angular/common';
// import { AdminNavbarComponent } from "../admin-navbar/admin-navbar.component";
// import { FileUploadService } from '../../Services-Admin/file-upload.service';
// import { LoginService } from '../../Services-Customer/login.service';

// @Component({
//     selector: 'app-admin-home',
//     standalone: true,
//     templateUrl: './admin-home.component.html',
//     styleUrl: './admin-home.component.scss',
//     providers: [FileUploadService],
//     imports: [MatFormFieldModule, MatPaginatorModule, AdminCustomerListComponent, AdminOwnerListComponent, CommonModule, AdminNavbarComponent]
// })
// export class AdminHomeComponent {
//     showUserDetail: boolean = true;
//     currentButtonActive: boolean = true;
//     pastButtonActive: boolean = false;

//       onCurrentBookingsClick(): void {
//         this.showUserDetail=true;
//         this.currentButtonActive = true;
//         this.pastButtonActive = false;
//       }

//       onPastBookingsClick(): void {
//     this.showUserDetail=false;
//         this.currentButtonActive = false;
//         this.pastButtonActive = true;
//       }



//       fileToUpload: File | null = null;

//   constructor(private fileUploadService: FileUploadService,private loginService: LoginService, ) {}

//   fileChange(event: Event): void {
//     const element = event.target as HTMLInputElement;
//     let files: FileList | null = element.files;
//     if (files && files.length > 0) {
//       const file = files[0];
//       this.fileToUpload = file; 
//     }
//   }

//   upload() {
//     if (this.fileToUpload) {
//       this.fileUploadService.upload(this.fileToUpload).subscribe(
//         (event:any) => {
//           console.log(event); // Handle the upload progress and response here
//         },
//         (error:any) => {
//           console.error("Upload error:", error);
//         }
//       );
//     }
//   }
// }


import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminCustomerListComponent } from "../admin-customer-list/admin-customer-list.component";
import { AdminOwnerListComponent } from "../admin-owner-list/admin-owner-list.component";
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from "../admin-navbar/admin-navbar.component";
import { FileUploadService } from '../../Services-Admin/file-upload.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { AuthService } from '../../Services-Customer/auth.service';
import { LoginService } from '../../Services-Customer/login.service';


@Component({
  selector: 'app-admin-home',
  standalone: true,
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
  providers: [FileUploadService, MatTableModule],
  imports: [MatFormFieldModule, MatPaginatorModule, AdminCustomerListComponent, AdminOwnerListComponent, CommonModule, AdminNavbarComponent
    , CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, NgxPaginationModule, CapitalizePipe]

})
export class AdminHomeComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  validationErrors: any[] = [];

  displayedColumns: string[] = ['serialNumber','columnName', 'rowNumber', 'errorMessage'];
  showUserDetail: boolean = true;
  currentButtonActive: boolean = true;
  pastButtonActive: boolean = false;

  onCurrentBookingsClick(): void {
    this.showUserDetail = true;
    this.currentButtonActive = true;
    this.pastButtonActive = false;
  }

  onPastBookingsClick(): void {
    this.showUserDetail = false;
    this.currentButtonActive = false;
    this.pastButtonActive = true;
  }

  fileToUpload: File | null = null;

  constructor(private fileUploadService: FileUploadService, private loginService: LoginService,) { }

  fileChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    let files: FileList | null = element.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.fileToUpload = file;
    }
  }

  upload() {
    if (this.fileToUpload) {
      this.fileUploadService.upload(this.fileToUpload).subscribe(
        (response: any) => {

          if (response.message) {
            this.loginService.openSnackBar(response.message);
            this.fileInput.nativeElement.value = '';
          } else {
            this.validationErrors = response.errors;
          }
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}

