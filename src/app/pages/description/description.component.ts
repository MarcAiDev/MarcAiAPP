import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from "../../components/main-button/main-button.component";

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule, RouterLink, MainButtonComponent],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export default class DescriptionComponent {
  loja: any;
  cards: any[] = [];

   lojas = [
  {
    id: 'loja-da-amazonia',
    idFeira: 'vero-peso',
    nome: 'Loja da Amazônia',
    tipo: 'Artesanato',
    status: 'Aberto',
    nota: 4.9,
    descricao: 'Produtos típicos da região amazônica com qualidade.',
    imagem: 'assets/artesanato.jpeg',
    categorias: [
      { icon: 'assets/3d-cube.png', type: 'Artesanato' },
      { icon: 'assets/people.png', type: 'Cultura local' }
    ]
  },
  {
    id: 'peixaria-do-norte',
    idFeira: 'vero-peso',
    nome: 'Peixaria do Norte',
    tipo: 'Alimentação',
    status: 'Fechado',
    nota: 4.5,
    descricao: 'Peixes frescos direto dos rios amazônicos.',
    imagem: 'assets/peixes.jpg',
    categorias: [
      { icon: 'assets/3d-cube.png', type: 'Frutos do mar' },
      { icon: 'assets/people.png', type: 'Comida regional' }
    ]
  },
  {
    id: 'sabores-de-bras',
    idFeira: 'sao-bras',
    nome: 'Sabores de Brás',
    tipo: 'Comida típica',
    status: 'Aberto',
    nota: 4.7,
    descricao: 'Restaurante com pratos tradicionais paraenses.',
    imagem: 'assets/saboresBras.jpg',
    categorias: [
      { icon: 'assets/3d-cube.png', type: 'Comida típica' },
      { icon: 'assets/people.png', type: 'Restaurante' }
    ]
  },
  {
    id: 'bar-do-lino',
    idFeira: 'sao-bras',
    nome: 'Bar do Lino',
    tipo: 'Social',
    status: 'Aberto',
    nota: 4.9,
    descricao: 'O Bar do Lino é um clássico da região, conhecido pelo ambiente descontraído, cerveja sempre gelada e petiscos com o verdadeiro sabor paraense. Um ponto de encontro querido por moradores e visitantes, perfeito para relaxar, ouvir música e aproveitar boas conversas.',
    imagem: 'assets/barLino2.png',
    categorias: [
      { icon: 'assets/3d-cube.png', type: 'Drinks' },
      { icon: 'assets/music-square.png', type: 'Música' },
      { icon: 'assets/people.png', type: 'Social' }
    ]
  },
  {
    id: 'andreia-semijoias-e-folheados',
    idFeira: 'comercio',
    nome: 'Andreia Semijoias e folheados',
    tipo: 'Loja',
    status: 'Aberto',
    nota: 5.0,
    descricao: 'Descubra o brilho da Andreia Semijoias e Folheados! Oferecemos peças únicas e sofisticadas que combinam estilo, qualidade e preço acessível. Perfeitas para realçar sua beleza em qualquer ocasião, nossas semijoias e folheados são feitos com cuidado e design moderno. Visite-nos e encontre o acessório ideal para você ou para presentear quem ama!',
    imagem: 'assets/andreiaJoias2.png',
    categorias: [
      { icon: 'assets/3d-cube.png', type: 'Acessórios' },
      { icon: 'assets/people.png', type: 'Moda' }
    ]
  },
  {
    id: 'mariana-tecidos',
    idFeira: 'comercio',
    nome: 'Mariana tecidos',
    tipo: 'Loja',
    status: 'Aberto',
    nota: 5.0,
    descricao: 'Encante-se com a Mariana Tecidos! Aqui, você encontra uma variedade de tecidos de alta qualidade, perfeitos para transformar suas ideias em realidade. Seja para moda, decoração ou artesanato, nossos produtos unem beleza, durabilidade e preço justo. Visite-nos e deixe sua criatividade fluir com os melhores tecidos do mercado!',
    imagem: 'assets/marianaTecidos.png',
    categorias: [
      { icon: 'assets/3d-cube.png', type: 'Tecidos' },
      { icon: 'assets/people.png', type: 'Artesanato' }
    ]
  },
  {
    id: 'casa-da-maquiagem',
    idFeira: 'comercio',
    nome: 'Casa da maquiagem',
    tipo: 'Loja',
    status: 'Aberto',
    nota: 5.0,
    descricao: 'Encante-se com a Mariana Tecidos! Aqui, você encontra uma variedade de tecidos de alta qualidade, perfeitos para transformar suas ideias em realidade. Seja para moda, decoração ou artesanato, nossos produtos unem beleza, durabilidade e preço justo. Visite-nos e deixe sua criatividade fluir com os melhores tecidos do mercado!',
    imagem: 'assets/casaMaquiagem.png',
    categorias: [
      { icon: 'assets/3d-cube.png', type: 'Beleza' },
      { icon: 'assets/people.png', type: 'Cosméticos' }
    ]
  }
];


  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loja = this.lojas.find((l) => l.id === id);
    if (this.loja) {
      this.cards = this.loja.categorias;
    }
  }
}
