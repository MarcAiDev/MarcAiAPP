import { Component } from '@angular/core';
import { MainInputComponent } from "../../components/main-input/main-input.component";
import { MainButtonComponent } from "../../components/main-button/main-button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MainInputComponent, MainButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  constructor(private router: Router) { }

  handlelogin() {
    this.router.navigate(['']); 
  }
  
}
