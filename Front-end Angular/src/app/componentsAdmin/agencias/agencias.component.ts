import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Define la interfaz para las agencias
interface Agencia {
  name: string;
  address: string;
  phone: string;
  email: string;
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Inicializar la lista de agencias
    this.agencias = [
      { name: 'Miraflores', address: 'Av. Pardo y Aliaga 123', phone: '987654321', email: 'miraflores@example.com' },
      { name: 'San Isidro', address: 'Calle Los Conquistadores 456', phone: '987654322', email: 'sanisidro@example.com' },
      { name: 'Surco', address: 'Av. La Encalada 789', phone: '987654323', email: 'surco@example.com' },
      { name: 'Agencia 1', address: 'Dirección 1', phone: '123456789', email: 'email1@agencia.com' },
      { name: 'Agencia 2', address: 'Dirección 2', phone: '987654321', email: 'email2@agencia.com' },
    ];

    // Inicializar las agencias filtradas con todas las agencias
    this.filteredAgencias = [...this.agencias];
  }

  // Método para filtrar las agencias basadas en la consulta de búsqueda
  searchLocation(): void {
    const queryLowerCase = this.searchQuery.trim().toLowerCase();
    this.filteredAgencias = queryLowerCase
      ? this.agencias.filter(agencia =>
          agencia.name.toLowerCase().includes(queryLowerCase) ||
          agencia.address.toLowerCase().includes(queryLowerCase)
        )
      : [...this.agencias]; // Si la búsqueda está vacía, mostrar todas las agencias
  }

  // Manejar la selección de la agencia desde el menú desplegable
  selectAgencia(agenciaName: string): void {
    if (agenciaName) {
      const selectedAgencia = this.filteredAgencias.find(agencia => agencia.name === agenciaName);
      if (selectedAgencia) {
        this.viewDetails(selectedAgencia);
      }
    }
  }

  // Navegar a la página de detalles de la agencia
  viewDetails(agencia: Agencia): void {
    this.router.navigate(['/agencia-detalle', agencia.name]); // Redirigir usando el nombre de la agencia
  }

  // Mostrar la ubicación de la agencia seleccionada en el mapa
  showLocation(agencia: Agencia): void {
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(agencia.address)}`;
    window.open(mapUrl, '_blank'); // Abrir la ubicación en una nueva pestaña
  }
}
