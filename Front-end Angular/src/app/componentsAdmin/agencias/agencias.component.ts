import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

interface Agencia {
  location: any;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  distrito: string;
  hours: string;
}

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.css'],
})
export class AgenciasComponent implements OnInit {
  selectedDistrict: string = '';
  selectedAgency: any = null;

  // Datos de ejemplo de los distritos
  districts: string[] = [];

  // Agencias de ejemplo
  agencies: Agencia[] = [
    {
      name: 'ATE',
      address: 'Av. Prolongación Javier Prado N° 9288, Tda. 101',
      hours: 'Lunes a Viernes: 9:00 am - 1:00pm / 2:00pm - 6:00pm',
      distrito: 'San Isidro',
      location: { lat: -12.043, lng: -77.028 },
      latitude: 0,
      longitude: 0,
      image: 'assets/iconos/icono.png'
    },
    {
      name: 'Miraflores Agencia',
      address: 'Av. Pardo y Aliaga 650, Tda. 102',
      hours: 'Lunes a Viernes: 9:00 am - 6:00pm',
      distrito: 'Miraflores',
      location: { lat: -12.115, lng: -77.028 },
      latitude: 0,
      longitude: 0,
      image: 'assets/iconos/icono.png'
    },
    {
  name: 'Agencia Callao',
  address: 'Av. El Puerto 1200, Tda. 201',
  hours: 'Lunes a Viernes: 9:00 am - 5:30 pm',
  distrito: 'Callao',
  location: { lat: -12.060, lng: -77.155 },
  latitude: 0,
  longitude: 0,
  image: 'assets/iconos/icono.png'
},
{
  name: 'Agencia Surco',
  address: 'Av. Tomas Marsano 1000, Tda. 204',
  hours: 'Lunes a Viernes: 9:00 am - 6:00 pm',
  distrito: 'Surco',
  location: { lat: -12.114, lng: -77.020 },
  latitude: 0,
  longitude: 0,
  image: 'assets/iconos/icono.png'
},
{
  name: 'Agencia San Juan de Miraflores',
  address: 'Av. Los Héroes 950, Tda. 301',
  hours: 'Lunes a Viernes: 8:30 am - 5:00 pm',
  distrito: 'San Juan de Miraflores',
  location: { lat: -12.169, lng: -76.968 },
  latitude: 0,
  longitude: 0,
  image: 'assets/iconos/icono.png'
}




    // Más agencias...
  ];

  map: any;

  constructor() {}

  ngOnInit() {
    this.initializeMap();
    this.updateDistricts();
  }

  // Inicialización del mapa con Leaflet
  initializeMap() {
    this.map = L.map('map').setView([ -12.043, -77.028 ], 12); // Ubicación inicial del mapa

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Agregar todos los marcadores de las agencias inicialmente
    this.addAgencyMarkers();
  }

  // Función para agregar marcadores de agencias en el mapa
// Función para agregar marcadores de agencias en el mapa
// Función para agregar marcadores de agencias en el mapa con iconos reducidos// Función para agregar marcadores con iconos con forma (círculos) en el mapa
addAgencyMarkers() {
  this.agencies.forEach(agency => {
    // Verifica si la imagen se carga correctamente en el HTML
    const iconHtml = `<div style="background-image: url('${agency.image}'); background-size: cover; width: 30px; height: 30px; border-radius: 50%;"></div>`;

    // Crear un icono con forma circular y tamaño reducido
    const customIcon = L.divIcon({
      className: 'custom-icon', // Clase CSS personalizada para aplicar estilos
      html: iconHtml, // Aplica el HTML con el background-image
      iconSize: [30, 30], // Ajusta el tamaño del icono
      iconAnchor: [15, 15], // Ancla el icono al centro
      popupAnchor: [0, -30] // Ajuste para la ventana emergente
    });

    const marker = L.marker([agency.location.lat, agency.location.lng], { icon: customIcon })
      .addTo(this.map)
      .bindPopup(agency.name)
      .on('click', () => {
        this.selectedAgency = agency; // Muestra información al hacer clic
        this.map.setView([agency.location.lat, agency.location.lng], 14); // Hace zoom en la agencia
      });
  });
}



  // Función que maneja el cambio del distrito y actualiza la lista de agencias
  onDistrictChange() {
    this.searchAgencies();
  }

  // Función para actualizar los distritos según las agencias
  updateDistricts() {
    // Obtener los distritos únicos
    this.districts = Array.from(new Set(this.agencies.map(agency => agency.distrito)));

    // Restablecer el filtro de distrito
    this.selectedDistrict = '';
  }

  // Función para buscar agencias filtradas por distrito
// Función para buscar agencias filtradas por distrito
searchAgencies() {
  const filteredAgencies = this.agencies.filter(agency =>
    (this.selectedDistrict === '' || agency.distrito === this.selectedDistrict)
  );

  // Si se encuentran agencias, toma la primera y haz zoom en ella
  if (filteredAgencies.length > 0) {
    const firstAgency = filteredAgencies[0];
    this.selectedAgency = firstAgency;

    // Limpia los marcadores antiguos
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Mostrar las agencias filtradas en el mapa
    filteredAgencies.forEach(agency => {
      const customIcon = L.divIcon({
        className: 'custom-icon', // Clase CSS personalizada para aplicar estilos
        html: `<div style="background-image: url('${agency.image}'); background-size: cover; width: 30px; height: 30px; border-radius: 50%;"></div>`,
        iconSize: [30, 30], // Ajusta el tamaño del icono
        iconAnchor: [15, 15], // Ancla el icono al centro
        popupAnchor: [0, -30] // Ajuste para la ventana emergente
      });

      const marker = L.marker([agency.location.lat, agency.location.lng], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(agency.name)
        .on('click', () => {
          this.selectedAgency = agency; // Muestra información al hacer clic
          this.map.setView([agency.location.lat, agency.location.lng], 14); // Hace zoom en la agencia
        });
    });

    // Hace zoom en la primera agencia filtrada y muestra sus detalles
    this.map.setView([firstAgency.location.lat, firstAgency.location.lng], 14);
  } else {
    this.selectedAgency = null; // Si no se encuentran agencias, reseteamos la selección
  }
}

}
