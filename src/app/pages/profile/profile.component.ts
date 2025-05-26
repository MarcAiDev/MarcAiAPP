import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MainButtonComponent } from "../../components/main-button/main-button.component";

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, MainButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent {

}
