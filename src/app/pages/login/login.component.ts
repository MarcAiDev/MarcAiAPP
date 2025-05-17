import { Component } from '@angular/core';
import { MainInputComponent } from "../../components/main-input/main-input.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MainInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

}
