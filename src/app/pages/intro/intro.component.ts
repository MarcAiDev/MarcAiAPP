import { Component } from '@angular/core';
import { MainButtonComponent } from "../../components/main-button/main-button.component";

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [MainButtonComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export default class IntroComponent {

}
