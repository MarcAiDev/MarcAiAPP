import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-market-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './market-info.component.html',
  styleUrl: './market-info.component.scss',
})
export default class MarketInfoComponent {
  feira: any;

  feiras = [
    {
      id: 'vero-peso',
      nome: 'Ver-o-Peso',
      local: 'Belém, Pará',
      descricao:
        'O Ver-o-Peso é um dos pontos turísticos mais icônicos de Belém do Pará e o maior mercado a céu aberto da América Latina. Localizado às margens da Baía do Guajará, o local reúne uma grande diversidade de produtos típicos da região amazônica, como frutas exóticas, ervas medicinais, peixes frescos, especiarias e artesanato local.',
      nota: 4.8,
      status: 'Aberto',
      image: 'assets/veroPeso2.jpg'
    },
    {
      id: 'sao-bras',
      nome: 'Mercado de São Brás',
      local: 'Belém, Pará',
      descricao:
        'O Mercado de São Brás é um ponto histórico de Belém que une cultura e gastronomia. É conhecido por sua arquitetura e diversidade de produtos regionais.',
      nota: 4.6,
      status: 'Aberto',
      image: 'assets/saoBras.jpg'
    },
    {
      id: 'comercio',
      nome: 'Comércio',
      local: 'Belém, Pará',
      descricao:
        'O Comércio de Belém é uma área repleta de lojas, feiras e mercados populares, movimentado por turistas e moradores locais em busca de variedade e bons preços.',
      nota: 4.6,
      status: 'Fechado',
      image: 'assets/comercio.jpg'
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.feira = this.feiras.find((f) => f.id === id);
  }
}
