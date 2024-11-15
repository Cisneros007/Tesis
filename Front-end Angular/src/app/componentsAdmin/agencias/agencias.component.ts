import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

// Define la interfaz para las agencias
interface Agencia {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;  // Nueva propiedad para la imagen
}

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.css']
})
export class AgenciasComponent implements OnInit {
  searchQuery: string = '';
  selectedAgencia: string = '';
  agencias: Agencia[] = [];
  filteredAgencias: Agencia[] = [];
  map: any;

  constructor() {}

  ngOnInit(): void {
    // Inicializar la lista de agencias con coordenadas y una imagen para cada agencia
    this.agencias = [
      { name: 'Miraflores', address: 'Av. Pardo y Aliaga 123', latitude: -12.1194, longitude: -77.0345, image: '/assets/iconos/icono.png' },
      { name: 'San Isidro', address: 'Calle Los Conquistadores 456', latitude: -12.0924, longitude: -77.0465, image: '/assets/iconos/icono.png' },
      { name: 'Surco', address: 'Av. La Encalada 789', latitude: -12.1085, longitude: -76.9643, image: '/assets/iconos/icono.png' },
      { name: 'Agencia 1', address: 'Dirección 1', latitude: -12.0464, longitude: -77.0428, image: '/assets/iconos/icono.png' },
      { name: 'Callao', address: 'AV callao ', latitude: -12.0455, longitude: -77.0315, image: '/assets/iconos/icono.png' },
    ];

    this.filteredAgencias = [...this.agencias];
    this.initMap();
    this.addMarkersToMap();
  }

  // Inicializar el mapa de Leaflet
  initMap(): void {
    this.map = L.map('map').setView([-12.0464, -77.0428], 12); // Centro inicial en Lima
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  // Añadir marcadores para todas las agencias en el mapa con imágenes personalizadas
  addMarkersToMap(): void {
    this.filteredAgencias.forEach(agencia => {
      // Crear un icono personalizado para el marcador con una imagen
      const customIcon = L.icon({
        iconUrl: agencia.image,
        iconSize: [30, 30], // Ajusta el tamaño de la imagen
        iconAnchor: [20, 40], // Ajusta el punto de anclaje del icono
        popupAnchor: [0, -40] // Ajusta la posición del popup
      });

      const marker = L.marker([agencia.latitude, agencia.longitude], { icon: customIcon }).addTo(this.map);
      marker.bindPopup(`<b>${agencia.name}</b><br>${agencia.address}`);
    });
  }

  // Método para filtrar las agencias
  searchLocation(): void {
    const queryLowerCase = this.searchQuery.trim().toLowerCase();
    this.filteredAgencias = queryLowerCase
      ? this.agencias.filter(agencia =>
          agencia.name.toLowerCase().includes(queryLowerCase) ||
          agencia.address.toLowerCase().includes(queryLowerCase)
        )
      : [...this.agencias];

    // Si hay resultados, actualizar los marcadores y hacer zoom en la primera agencia encontrada
    if (this.filteredAgencias.length > 0) {
      const firstAgencia = this.filteredAgencias[0];
      this.updateMapMarkers();
      this.map.setView([firstAgencia.latitude, firstAgencia.longitude], 18); // Centra el mapa y hace zoom en la primera agencia
    } else {
      this.updateMapMarkers(); // Solo actualiza los marcadores si no hay resultados
    }
  }

  // Actualizar marcadores en el mapa basados en la búsqueda filtrada
  updateMapMarkers(): void {
    // Eliminar los marcadores previos
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Añadir marcadores de las agencias filtradas
    this.addMarkersToMap();
  }
}
