import { Component } from '@angular/core';
import { MainInputComponent } from "../../components/main-input/main-input.component";
import { MainButtonComponent } from '../../components/main-button/main-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MainInputComponent, MainButtonComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent {

}
