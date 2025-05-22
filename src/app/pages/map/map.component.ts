import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [NavbarComponent],
})
export default class MapComponent implements OnInit {
  map: any;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const bounds = L.latLngBounds(L.latLng(-1.45, -48.48), L.latLng(-1.45, -48.48));

    this.map = L.map('map', {
      center: [-1.4558, -48.4902],
      zoom: 13,
      minZoom: 13,
      maxZoom: 15,
      maxBounds: bounds,
      maxBoundsViscosity: 2.0,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }
}
