import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-market-stores',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchBarComponent],
  templateUrl: './market-stores.component.html',
  styleUrl: './market-stores.component.scss'
})
export default class MarketStoresComponent {
  feiraNome = '';
  cards: any[] = [];

  // Lojas com identificação da feira
  lojas = [
    {
      id: 'vero-peso',
      nome: 'Loja da Amazônia',
      tipo: 'Artesanato',
      status: 'Aberto',
      nota: 4.9,
      descricao: 'Produtos típicos da região amazônica com qualidade.',
      imagem: 'assets/artesanato.jpeg',
    },
    {
      id: 'vero-peso',
      nome: 'Peixaria do Norte',
      tipo: 'Alimentação',
      status: 'Fechado',
      nota: 4.5,
      descricao: 'Peixes frescos direto dos rios amazônicos.',
      imagem: 'assets/peixes.jpg',
    },
    {
      id: 'sao-bras',
      nome: 'Sabores de Brás',
      tipo: 'Comida típica',
      status: 'Aberto',
      nota: 4.7,
      descricao: 'Restaurante com pratos tradicionais paraenses.',
      imagem: 'assets/saboresBras.jpg',
    },
    {
      id: 'sao-bras',
      nome: 'Bar do Lino',
      tipo: 'Social',
      status: 'Aberto',
      nota: 4.9,
      descricao: 'O Bar do Lino é um clássico da região, conhecido pelo ambiente descontraído, cerveja sempre gelada e petiscos com o verdadeiro sabor paraense. Um ponto de encontro querido por moradores e visitantes, perfeito para relaxar, ouvir música e aproveitar boas conversas.',
      imagem: 'assets/barLino2.png',
    },
    {
      id: 'comercio',
      nome: 'Andreia Semijoias e folheados',
      tipo: 'Loja',
      status: 'Aberto',
      nota: 5.0,
      descricao: 'Descubra o brilho da Andreia Semijoias e Folheados! Oferecemos peças únicas e sofisticadas que combinam estilo, qualidade e preço acessível. Perfeitas para realçar sua beleza em qualquer ocasião, nossas semijoias e folheados são feitos com cuidado e design moderno. Visite-nos e encontre o acessório ideal para você ou para presentear quem ama!',
      imagem: 'assets/andreiaJoias2.png',
    },
    {
      id: 'comercio',
      nome: 'Mariana tecidos',
      tipo: 'Loja',
      status: 'Aberto',
      nota: 5.0,
      descricao: 'Encante-se com a Mariana Tecidos! Aqui, você encontra uma variedade de tecidos de alta qualidade, perfeitos para transformar suas ideias em realidade. Seja para moda, decoração ou artesanato, nossos produtos unem beleza, durabilidade e preço justo. Visite-nos e deixe sua criatividade fluir com os melhores tecidos do mercado!',
      imagem: 'assets/marianaTecidos.png',
    },
    {
      id: 'comercio',
      nome: 'Casa da maquiagem',
      tipo: 'Loja',
      status: 'Aberto',
      nota: 5.0,
      descricao: 'Encante-se com a Mariana Tecidos! Aqui, você encontra uma variedade de tecidos de alta qualidade, perfeitos para transformar suas ideias em realidade. Seja para moda, decoração ou artesanato, nossos produtos unem beleza, durabilidade e preço justo. Visite-nos e deixe sua criatividade fluir com os melhores tecidos do mercado!',
      imagem: 'assets/casaMaquiagem.png',
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const feiraId = this.route.snapshot.paramMap.get('id');
    if (feiraId) {
      // Filtra as lojas que pertencem à feira
      this.cards = this.lojas.filter(loja => loja.id === feiraId);

      // Define o nome da feira para o header (opcionalmente você pode ter uma lista de feiras para puxar esse nome)
      const nomesFeiras: { [key: string]: string } = {
        'vero-peso': 'Ver-o-Peso',
        'sao-bras': 'São Brás',
        'comercio': 'Comércio'
      };
      this.feiraNome = nomesFeiras[feiraId] || 'Feira';
    }
  }
}
