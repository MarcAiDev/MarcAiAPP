import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-description',
  imports: [NgFor, RouterLink],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export default class DescriptionComponent {
  cards = [
    {
      icon: 'assets/3d-cube.png',
      type: 'Drinks',
    },
    {
      icon: 'assets/music-square.png',
      type: 'Música',
    },
    {
      icon: 'assets/people.png',
      type: 'Social',
    },
  ]
}
