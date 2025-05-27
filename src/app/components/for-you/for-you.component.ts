import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-for-you',
  imports: [NgFor, NgClass,RouterLink],
  templateUrl: './for-you.component.html',
  styleUrl: './for-you.component.scss'
})
export class ForYouComponent {
  cards = [
    {
      nome: 'Casa da maquiagem',
      idLoja: 'casa-da-maquiagem',
      tipo: 'Loja',
      imagem: 'assets/casaMaquiagem.png',
      status: 'Aberto',
      nota: 5.0,
      descricao: 'Encante-se com a Mariana Tecidos! Aqui, você encontra uma variedade de tecidos de alta qualidade, perfeitos para transformar suas ideias em realidade. Seja para moda, decoração ou artesanato, nossos produtos unem beleza, durabilidade e preço justo. Visite-nos e deixe sua criatividade fluir com os melhores tecidos do mercado!'
    },
    {
      nome: 'Peixaria do Norte',
      idLoja: 'peixaria-do-norte',
      tipo: 'loja',
      imagem: 'assets/peixes.jpg',
      status: 'Fechado',
      nota: 4.7,
      descricao: 'Peixes frescos direto dos rios amazônicos.'
    },
    {
      nome: 'Bar do Lino',
      idLoja: 'bar-do-lino',
      tipo: 'loja',
      imagem: 'assets/barLino.png',
      status: 'Fechado',
      nota: 4.6,
      descricao: 'O Bar do Lino é um clássico da região, conhecido pelo ambiente descontraído, cerveja sempre gelada e petiscos com o verdadeiro sabor paraense. Um ponto de encontro querido por moradores e visitantes, perfeito para relaxar, ouvir música e aproveitar boas conversas.'
    },
    
  ];

}
