import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminCustomerListComponent } from "../admin-customer-list/admin-customer-list.component";
import { AdminOwnerListComponent } from "../admin-owner-list/admin-owner-list.component";
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from "../admin-navbar/admin-navbar.component";

@Component({
    selector: 'app-admin-home',
    standalone: true,
    templateUrl: './admin-home.component.html',
    styleUrl: './admin-home.component.scss',
    imports: [MatFormFieldModule, MatPaginatorModule, AdminCustomerListComponent, AdminOwnerListComponent, CommonModule, AdminNavbarComponent]
})
export class AdminHomeComponent {
    showUserDetail: boolean = true;
    currentButtonActive: boolean = true;
    pastButtonActive: boolean = false;


    // toggleDetailView(): void {
    //     this.showUserDetail = !this.showUserDetail;
    //   }


      onCurrentBookingsClick(): void {
        this.showUserDetail=true;
        this.currentButtonActive = true;
        this.pastButtonActive = false;
      }
    
      onPastBookingsClick(): void {
    this.showUserDetail=false;
        this.currentButtonActive = false;
        this.pastButtonActive = true;
      }
}
