import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { ForYouComponent } from "../../components/for-you/for-you.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-market-stores',
  imports: [SearchBarComponent, ForYouComponent, RouterLink],
  templateUrl: './market-stores.component.html',
  styleUrl: './market-stores.component.scss'
})
export default class MarketStoresComponent {

}
