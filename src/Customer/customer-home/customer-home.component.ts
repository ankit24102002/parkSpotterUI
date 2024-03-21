import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNavbarComponent } from "../customer-navbar/customer-navbar.component";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AvaliableSpacesComponent } from "../avaliable-spaces/avaliable-spaces.component";
@Component({
    selector: 'app-customer-home',
    standalone: true,
    templateUrl: './customer-home.component.html',
    styleUrl: './customer-home.component.scss',
    imports: [CustomerNavbarComponent, CommonModule, MatSidenavModule, MatButtonModule, AvaliableSpacesComponent]
})
export class CustomerHomeComponent {
    showFiller = false;
}
