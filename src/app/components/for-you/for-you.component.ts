import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-for-you',
  imports: [NgFor, NgClass],
  templateUrl: './for-you.component.html',
  styleUrl: './for-you.component.scss'
})
export class ForYouComponent {
 cards = [
  {
    nome: 'Ver-o-Peso',
    imagem: 'assets/veroPeso.png',
    status: 'Aberto',
    nota: 4.8,
    descricao: 'O maior mercado a céu aberto da América Latina, cheio de cultura, sabores e história.'
  },
  {
    nome: 'Cafeteria do Norte',
    imagem: 'assets/cafe.png',
    status: 'Fechado',
    nota: 4.7,
    descricao: 'Um espaço aconchegante no centro da cidade, perfeito para tomar um café regional e apoiar produtores locais.'
  }
];

}
