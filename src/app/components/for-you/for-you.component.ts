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
    nome: 'Dona Charme',
    tipo: 'Loja',
    imagem: 'assets/donaCharme.jpg',
    status: 'Aberto',
    nota: 4.8,
    descricao: 'Explore a moda com estilo na Dona Charme! Encontre peças únicas, das tendências mais atuais às clássicas atemporais, para todos os gostos e ocasiões. Qualidade, conforto e preços acessíveis em um só lugar. Renove seu guarda-roupa hoje!'
  },
  {
    nome: 'Cafeteria do Norte',
    tipo: 'loja',
    imagem: 'assets/cafe.png',
    status: 'Fechado',
    nota: 4.7,
    descricao: 'Um espaço aconchegante no centro da cidade, perfeito para tomar um café regional e apoiar produtores locais.'
  },
  {
    nome: 'Bar do Lino',
    tipo: 'loja',
    imagem: 'assets/barLino.png',
    status: 'Fechado',
    nota: 4.6,
    descricao: 'O Bar do Lino é um clássico da região, conhecido pelo ambiente descontraído, cerveja sempre gelada e petiscos com o verdadeiro sabor paraense. Um ponto de encontro querido por moradores e visitantes, perfeito para relaxar, ouvir música e aproveitar boas conversas.'
  },
  
];

}
