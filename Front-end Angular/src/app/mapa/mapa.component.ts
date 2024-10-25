import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public map: any;

  ngOnInit(): void {
    this.initMap();
  }
  
  public initMap(): void {
    
    this.map = L.map('map').setView([-12.04547263894786, -76.9522990974624], 13);

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Agrega un marcador en las coordenadas de Tecsup
    L.marker([-12.04547263894786, -76.9522990974624]).addTo(this.map)
      .bindPopup('Tecsup Santa Anita, Lima')
      .openPopup();
  }
}
