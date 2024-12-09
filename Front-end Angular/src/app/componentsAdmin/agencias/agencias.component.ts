import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Agencia } from 'src/app/models-cliente/agencia.model';
import { AgenciasService } from 'src/app/services-cliente/agencias.service';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.css']
})
export class AgenciasComponent implements OnInit {
  searchQuery: string = '';
  selectedAgency: Agencia | null = null;
  agencias: Agencia[] = [];
  filteredAgencias: Agencia[] = [];
  map: any;

  constructor(private agenciasService: AgenciasService) {}

  ngOnInit(): void {
    this.loadAgencias(); // Llamar al método para cargar las agencias desde la API
    this.initMap(); // Inicializar el mapa
  }

  // Método para cargar agencias desde la API
  loadAgencias(): void {
    this.agenciasService.getAgencias().subscribe((data: Agencia[]) => {
      this.agencias = data;
      this.filteredAgencias = [...this.agencias]; // Inicializamos con todas las agencias
      this.addMarkersToMap(); // Añadir marcadores al mapa después de cargar las agencias
    });
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
      const customIcon = L.icon({
        iconUrl: agencia.image,  // URL de la imagen de la agencia
        iconSize: [30, 30], // Ajusta el tamaño de la imagen
        iconAnchor: [20, 40], // Ajusta el punto de anclaje del icono
        popupAnchor: [0, -40] // Ajusta la posición del popup
      });

      const marker = L.marker([agencia.latitude, agencia.longitude], { icon: customIcon }).addTo(this.map);
      marker.bindPopup(`<b>${agencia.nombre}</b><br>${agencia.email}`);
    });
  }

  // Método para filtrar las agencias por nombre o email, usando el evento change
  searchLocation(event: any): void {
    const query = event ? event.target.value : ''; // Si es null, resetea el filtro
    this.searchQuery = query;
  
    if (query === null || query === '' || query === 'Distrito') {
      // Si no hay búsqueda (campo vacío o valor por defecto)
      this.filteredAgencias = [...this.agencias]; // Restablecer todas las agencias
      this.map.setView([-12.0464, -77.0428], 12); // Centra el mapa en Lima (o la ubicación que desees)
    } else {
      // Si hay una búsqueda activa
      const queryLowerCase = this.searchQuery.trim().toLowerCase();
      this.filteredAgencias = this.agencias.filter(agencia =>
        agencia.nombre.toLowerCase().includes(queryLowerCase) ||
        agencia.email.toLowerCase().includes(queryLowerCase)
      );
      
      // Si hay resultados de búsqueda, centra el mapa en la primera agencia encontrada
      if (this.filteredAgencias.length > 0) {
        const firstAgencia = this.filteredAgencias[0];
        this.map.setView([firstAgencia.latitude, firstAgencia.longitude], 18); // Centra y hace zoom en la primera agencia
      } else {
        // Si no hay resultados, resetea el mapa a Lima
        this.map.setView([-12.0464, -77.0428], 12);
      }
    } } 

  // Actualizar marcadores en el mapa basados en la búsqueda filtrada
  updateMapMarkers(): void {
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer); // Elimina todos los marcadores previos
      }
    });

    this.addMarkersToMap(); // Añade los nuevos marcadores basados en el filtro actual
  }
}
