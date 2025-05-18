import { Component } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-home',
  imports: [SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

}
