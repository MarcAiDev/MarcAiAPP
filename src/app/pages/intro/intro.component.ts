import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainButtonComponent } from "../../components/main-button/main-button.component";

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [MainButtonComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export default class IntroComponent {
  constructor(private router: Router) {}

  gotologin() {
    this.router.navigate(['login']);
  }
}
