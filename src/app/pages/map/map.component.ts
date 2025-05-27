import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SliderItem {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  isOpen: boolean;
  coordinates: [number, number];
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [NavbarComponent, CommonModule, FormsModule],
})
export default class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('cardSlider', { static: false }) cardSlider!: ElementRef;

  map: any;
  private resizeTimeout: any;
  private markers: Map<number, L.Marker> = new Map();

  // Search functionality
  searchTerm = '';
  filteredItems: SliderItem[] = [];
  showCard = true; // Agora começa como true para mostrar todos os cards

  // Slider properties
  currentSlide = 0;
  sliderItems: SliderItem[] = [
    {
      id: 1,
      name: 'Ver-o-Peso',
      location: 'Belém',
      image: 'assets/veroPeso.png',
      rating: 4.5,
      isOpen: false,
      coordinates: [-1.452325, -48.503683]
    },
    {
      id: 2,
      name: 'Comercio',
      location: 'Belém',
      image: 'assets/foto_do_comercio.jpg',
      rating: 4.2,
      isOpen: true,
      coordinates: [-1.453231, -48.502122]
    },
    {
      id: 3,
      name: 'Mercado São Brás',
      location: 'Belém',
      image: 'assets/mercado_sao_bras.jpg',
      rating: 4.0,
      isOpen: true,
      coordinates: [-1.451412, -48.468503]
    }
  ];

  // Touch/Mouse events properties
  private isDragging = false;
  private startX = 0;
  private currentX = 0;
  private startTransform = 0;
  private threshold = 50;

  ngOnInit(): void {
    this.initMap();
    this.filteredItems = [...this.sliderItems];
  }

  ngAfterViewInit(): void {
    // Initialize slider position
    setTimeout(() => {
      this.updateSliderPosition();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    if (this.map) {
      this.map.remove();
    }
  }

  // Search functionality
  onSearchChange(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredItems = [...this.sliderItems];
      this.showCard = true; // Mantém o card visível quando não há busca
    } else {
      this.filteredItems = this.sliderItems.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.showCard = this.filteredItems.length > 0;

      // Reset to first slide when searching
      if (this.showCard) {
        this.currentSlide = 0;
        this.updateSliderPosition();
      }
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearchChange();
  }

  // Nova função para lidar com clique no card
  onCardClick(item: SliderItem, index: number): void {
    // Atualizar o slide atual
    this.currentSlide = index;
    this.updateSliderPosition();

    // Mover o mapa para o local correspondente
    if (this.map && item.coordinates) {
      this.map.setView(item.coordinates, 15, {
        animate: true,
        duration: 0.8
      });

      // Abrir o popup do marcador
      const marker = this.markers.get(item.id);
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 500);
      }
    }
  }

  // Slider methods
  goToSlide(index: number): void {
    if (index >= 0 && index < this.filteredItems.length) {
      this.currentSlide = index;
      this.updateSliderPosition();

      // Center map on selected location
      const selectedItem = this.filteredItems[index];
      if (this.map && selectedItem.coordinates) {
        this.map.setView(selectedItem.coordinates, this.map.getZoom(), {
          animate: true,
          duration: 0.3
        });
      }
    }
  }

  nextSlide(): void {
    const nextIndex = (this.currentSlide + 1) % this.filteredItems.length;
    this.goToSlide(nextIndex);
  }

  prevSlide(): void {
    const prevIndex = this.currentSlide === 0 ? this.filteredItems.length - 1 : this.currentSlide - 1;
    this.goToSlide(prevIndex);
  }

  private updateSliderPosition(): void {
    if (this.cardSlider?.nativeElement && this.filteredItems.length > 0) {
      const slideWidth = 100;
      const translateX = -this.currentSlide * slideWidth;
      this.cardSlider.nativeElement.style.transform = `translateX(${translateX}%)`;
    }
  }

  // Touch events
  onTouchStart(event: TouchEvent): void {
    if (!this.showCard) return;

    this.isDragging = true;
    this.startX = event.touches[0].clientX;
    this.currentX = this.startX;
    this.startTransform = this.currentSlide * -100;

    if (this.cardSlider?.nativeElement) {
      this.cardSlider.nativeElement.style.transition = 'none';
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging || !this.showCard) return;

    event.preventDefault();
    this.currentX = event.touches[0].clientX;
    const diffX = this.currentX - this.startX;
    const dragPercent = (diffX / window.innerWidth) * 100;

    if (this.cardSlider?.nativeElement) {
      const newTransform = this.startTransform + dragPercent;
      this.cardSlider.nativeElement.style.transform = `translateX(${newTransform}%)`;
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging || !this.showCard) return;

    this.isDragging = false;
    const diffX = this.currentX - this.startX;

    if (this.cardSlider?.nativeElement) {
      this.cardSlider.nativeElement.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
    }

    if (Math.abs(diffX) > this.threshold) {
      if (diffX > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    } else {
      this.updateSliderPosition();
    }
  }

  // Mouse events
  onMouseDown(event: MouseEvent): void {
    if (!this.showCard) return;

    this.isDragging = true;
    this.startX = event.clientX;
    this.currentX = this.startX;
    this.startTransform = this.currentSlide * -100;

    if (this.cardSlider?.nativeElement) {
      this.cardSlider.nativeElement.style.transition = 'none';
    }

    event.preventDefault();
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging || !this.showCard) return;

    this.currentX = event.clientX;
    const diffX = this.currentX - this.startX;
    const dragPercent = (diffX / window.innerWidth) * 100;

    if (this.cardSlider?.nativeElement) {
      const newTransform = this.startTransform + dragPercent;
      this.cardSlider.nativeElement.style.transform = `translateX(${newTransform}%)`;
    }
  }

  onMouseEnd(event: MouseEvent): void {
    if (!this.isDragging || !this.showCard) return;

    this.isDragging = false;
    const diffX = this.currentX - this.startX;

    if (this.cardSlider?.nativeElement) {
      this.cardSlider.nativeElement.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
    }

    if (Math.abs(diffX) > this.threshold) {
      if (diffX > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    } else {
      this.updateSliderPosition();
    }
  }

  // Keyboard navigation
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.showCard) return;

    if (event.key === 'ArrowLeft') {
      this.prevSlide();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    } else if (event.key === 'Escape') {
      this.clearSearch();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      this.handleMapResize();
      this.updateSliderPosition();
    }, 250);
  }

  private initMap(): void {
    // Definir limites rigorosos para Belém
    const belemBounds = L.latLngBounds(
      L.latLng(-1.5200, -48.5500), // Southwest
      L.latLng(-1.3800, -48.4000)  // Northeast
    );

    const mapOptions = {
      center: [-1.4558, -48.4902] as L.LatLngTuple,
      zoom: 15,
      minZoom: 14, // Zoom mínimo
      maxZoom: 15, // Zoom máximo (limitado)
      maxBounds: belemBounds, // Limites rígidos de Belém
      maxBoundsViscosity: 1.0, // Impede sair dos limites
      zoomControl: true,
      attributionControl: true,
      touchZoom: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
      boxZoom: false,
      keyboard: true,
      dragging: true,
      preferCanvas: false,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      inertia: true,
      inertiaDeceleration: 3000,
      inertiaMaxSpeed: 1500,
    };

    this.map = L.map('map', mapOptions);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      detectRetina: true,
    }).addTo(this.map);

    // Adicionar marcadores para os locais
    this.addLocationMarkers();

    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

  private addLocationMarkers(): void {
    const customIcon = L.icon({
      iconUrl: 'assets/pin.png',
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -35]
    });

    this.sliderItems.forEach((item) => {
      const marker = L.marker(item.coordinates, { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`
        <div style="text-align: center; padding: 5px;">
          <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
          <p style="margin: 0; color: #666;">${item.location}</p>
          <div style="margin-top: 5px;">
            <span style="color: #007AFF;">⭐ ${item.rating}/5</span>
            <span style="margin-left: 10px; color: ${item.isOpen ? '#22c55e' : '#ef4444'};">
              ${item.isOpen ? '🟢 Aberto' : '🔴 Fechado'}
            </span>
          </div>
        </div>
      `);

      this.markers.set(item.id, marker);

      marker.on('click', () => {
        const itemIndex = this.filteredItems.findIndex(filteredItem => filteredItem.id === item.id);
        if (itemIndex !== -1) {
          this.currentSlide = itemIndex;
          this.updateSliderPosition();
        }

        if (!this.filteredItems.some(filteredItem => filteredItem.id === item.id)) {
          this.searchTerm = item.name;
          this.onSearchChange();
          this.currentSlide = 0;
          this.updateSliderPosition();
        }
      });
    });
  }


  private handleMapResize(): void {
    if (this.map) {
      this.map.invalidateSize(true);
    }
  }
}