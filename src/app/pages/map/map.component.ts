import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import * as L from 'leaflet';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, RouterLink],
})
export default class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  map: any;
  private resizeTimeout: any;
  private markers: Map<number, L.Polygon> = new Map();
  private pinpointMarkers: L.Marker[] = [];
  searchTerm: string = '';
  private focusedPolygon: L.Polygon | null = null;
  private focusedFeiraId: string | null = null;
  private mapInitialized: boolean = false;
  private tileLayer: L.TileLayer | null = null;

  private feiraPinpoints: { [key: string]: { name: string; coords: [number, number]; idProduto: string }[] } = {
    'vero-peso': [
      { name: 'Banca da Maria', coords: [-1.4515, -48.5029], idProduto: 'peixaria-do-norte' },
    ],
    'comercio': [
      { name: 'Mariana Tecidos', coords: [-1.4527, -48.4998], idProduto: 'mariana-tecidos' },
      { name: 'Casa da Maquiagem', coords: [-1.4539659353515784, -48.50129442650628], idProduto: 'casa-da-maquiagem' },
      { name: 'Bijuteria Bom Sucesso', coords: [-1.4537168809200471, -48.50123264798111], idProduto: 'andreia-semijoias-e-folheados' }
    ],
    'sao-bras': [
      { name: 'Padaria São Brás', coords: [-1.4520, -48.4687], idProduto: 'sabores-de-bras' },
    ],
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.mapInitialized) {
      this.initMap();
    }
  }

  ngAfterViewInit(): void {
    if (this.map && this.mapInitialized) {
      setTimeout(() => this.map.invalidateSize(), 100);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    if (this.map) this.map.remove();
  }

  private initMap(): void {
    if (this.mapInitialized && this.map) {
      return;
    }

    const belemBounds = L.latLngBounds(
      L.latLng(-1.52, -48.55),
      L.latLng(-1.38, -48.4)
    );

    this.map = L.map('map', {
      center: [-1.4502, -48.4849],
      zoom: 14,
      minZoom: 14,
      maxZoom: 17,
      maxBounds: belemBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      touchZoom: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
      boxZoom: false,
      keyboard: true,
      dragging: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      inertia: true,
      inertiaDeceleration: 3000,
      inertiaMaxSpeed: 1500,
      preferCanvas: true,
    });

    // Cache tile layer
    if (!this.tileLayer) {
      this.tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap & Carto',
        subdomains: 'abcd',
        maxZoom: 20,
        keepBuffer: 4,
        updateWhenIdle: true,
        updateWhenZooming: false,
      });
    }
    
    this.tileLayer.addTo(this.map);
    this.addLocationMarkers();
    this.mapInitialized = true;

    // Add map click listener to clear focus
    this.map.on('click', (e: any) => {
      if (!e.originalEvent.defaultPrevented) {
        this.clearPolygonFocus();
      }
    });
  }

  private addPinpoints(idFeira: string): void {
    // Clear existing pinpoints
    this.clearPinpoints();

    // Only add pinpoints if there's a focused polygon
    if (!this.focusedPolygon || this.focusedFeiraId !== idFeira) {
      return;
    }

    const pinpoints = this.feiraPinpoints[idFeira] || [];

    const customIcon = L.icon({
      iconUrl: 'assets/pin.png',
      iconSize: [26, 26],
      iconAnchor: [16, 32],
      popupAnchor: [0, -36],
    });

    pinpoints.forEach(point => {
      const marker = L.marker(point.coords, { icon: customIcon }).addTo(this.map);
      marker.bindPopup(`
        <div style="text-align: center;">
          <strong>${point.name}</strong><br>
          <button onclick="window.location.href='/info/${point.idProduto}'" style="margin-top: 4px; padding: 4px 8px; font-size: 13px; background: #007AFF; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Ver loja
          </button>
        </div>
      `);
      this.pinpointMarkers.push(marker);
    });
  }

  private clearPinpoints(): void {
    this.pinpointMarkers.forEach(marker => this.map.removeLayer(marker));
    this.pinpointMarkers = [];
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.clearPolygonFocus();
      return;
    }

    const searchLower = this.searchTerm.toLowerCase().trim();
    const feiraPolygons = this.getFeiraPolygons();
    
    const matchedFeira = feiraPolygons.find(feira => 
      feira.name.toLowerCase().includes(searchLower) ||
      feira.idFeira.toLowerCase().includes(searchLower)
    );

    if (matchedFeira) {
      this.focusOnPolygon(matchedFeira.id, matchedFeira.idFeira);
    }
  }

  private focusOnPolygon(polygonId: number, feiraId: string): void {
    const polygon = this.markers.get(polygonId);
    if (polygon) {
      this.clearPolygonFocus();
      
      this.focusedPolygon = polygon;
      this.focusedFeiraId = feiraId;
      
      // Highlight focused polygon
      polygon.setStyle({
        color: '#FF6B35',
        weight: 3,
        fillColor: '#FF6B35',
        fillOpacity: 0.5,
        opacity: 1,
      });
      
      this.map.fitBounds(polygon.getBounds(), { maxZoom: 16 });
      polygon.openPopup();
      this.addPinpoints(feiraId);
    }
  }

  private clearPolygonFocus(): void {
    if (this.focusedPolygon) {
      // Close any open popups
      this.focusedPolygon.closePopup();
      this.map.closePopup();
      
      // Reset to default style
      this.focusedPolygon.setStyle({
        color: '#007AFF',
        weight: 2,
        fillColor: '#007AFF',
        fillOpacity: 0.3,
        opacity: 0.8,
      });
      
      this.focusedPolygon = null;
      this.focusedFeiraId = null;
      
      // Clear pinpoints when focus is cleared
      this.clearPinpoints();
    }
  }

  public isFocused(feiraId: string): boolean {
    return this.focusedFeiraId === feiraId;
  }

  private getFeiraPolygons() {
    return [
      {
        id: 1,
        idFeira: 'vero-peso',
        name: 'Ver-o-Peso',
        location: 'Belém',
        coordinates: [
          [-1.4528, -48.5039],
          [-1.4524, -48.5042],
          [-1.4502, -48.5018],
          [-1.4504, -48.5015],
        ] as [number, number][],
      },
      {
        id: 2,
        idFeira: 'comercio',
        name: 'Comércio',
        location: 'Belém',
        coordinates: [
          [-1.4505, -48.5014],
          [-1.4528, -48.5037],
          [-1.4556, -48.5017],
          [-1.4535, -48.5001],
          [-1.4547, -48.4982],
          [-1.4521, -48.4961],
          [-1.4485, -48.4985],
        ] as [number, number][],
      },
      {
        id: 3,
        idFeira: 'sao-bras',
        name: 'Mercado São Brás',
        location: 'Belém',
        coordinates: [
          [-1.4507, -48.4680],
          [-1.4520, -48.4678],
          [-1.4520, -48.4688],
          [-1.4510, -48.4689],
        ] as [number, number][],
      },
    ];
  }

  private addLocationMarkers(): void {
    const feiraPolygons = this.getFeiraPolygons();

    feiraPolygons.forEach(item => {
      const polygon = L.polygon(item.coordinates, {
        color: '#007AFF',
        weight: 2,
        fillColor: '#007AFF',
        fillOpacity: 0.3,
        opacity: 0.8,
      }).addTo(this.map);

      polygon.bindPopup(`
        <div style="text-align: center; padding: 8px; font-family: Arial, sans-serif;">
          <h4 style="margin: 0 0 5px 0; color: #333;">${item.name}</h4>
          <button onclick="window.location.href='/market-stores/${item.idFeira}'" style="margin-top: 4px; padding: 4px 8px; font-size: 13px; background: #007AFF; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Ver loja
          </button>
        </div>
      `, {
        autoPan: true,
        autoPanPadding: [10, 30],
        offset: [0, -40],
      });

      polygon.on('click', (e: any) => {
        e.originalEvent.preventDefault();
        this.focusOnPolygon(item.id, item.idFeira);
      });

      this.markers.set(item.id, polygon);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.handleMapResize();
    }, 250);
  }

  private handleMapResize(): void {
    if (this.map) {
      this.map.invalidateSize(true);
    }
  }
}
