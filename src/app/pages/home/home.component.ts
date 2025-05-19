import { Component } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { NgFor } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ForYouComponent } from "../../components/for-you/for-you.component";

@Component({
  selector: 'app-home',
  imports: [SearchBarComponent, NgFor, NavbarComponent, ForYouComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  items = ['Comércio', 'Alimentação', 'Conveniência', 'Farmácia'];

  cards = [
  {
    nome: 'Ver-o-Peso',
    tipo: 'Feira',
    local: 'Belém, Pará',
    imagem: 'assets/veroPeso.png',
    nota: 4.8
  },
  {
    nome: 'Bar do Lino',
    tipo: 'Loja',
    local: 'Belém, Pará',
    imagem: 'assets/barLino.png',
    nota: 4.6
  },
];
}
