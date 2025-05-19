import { Component } from '@angular/core';
import { RouterLink, RouterModule} from '@angular/router';
import { NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgFor, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navItems = [
    {
      label: 'Home',
      route: '/home',
      icon: 'assets/home-2.png',
      activeIcon: 'assets/home-2.png',
    },
    {
      label: 'Mapa',
      route: '/map',
      icon: 'assets/map.png',
      activeIcon:  'assets/map.png',
    },
    {
      label: 'Perfil',
      route: '/perfil',
      icon: 'assets/profile.png',
      activeIcon: 'assets/profile.png',
    },
  ];

}
