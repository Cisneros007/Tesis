import { Component, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';
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
export class AgenciasComponent implements OnInit, AfterViewInit {
  searchQuery: string = '';
  agencias: Agencia[] = [];
  filteredAgencias: Agencia[] = [];

  constructor(
    private router: Router, // Inyección del servicio Router
    private elRef: ElementRef, // Referencia al elemento del DOM
    private renderer: Renderer2 // Inyección del servicio Renderer2 para manipulación del DOM
  ) {}

  ngOnInit(): void {
    // Inicializar la lista de agencias
    this.agencias = [
      { name: 'Miraflores', address: 'Av. Pardo y Aliaga 123', phone: '987654321', email: 'miraflores@example.com' },
      { name: ' San Isidro', address: 'Calle Los Conquistadores 456', phone: '987654322', email: 'sanisidro@example.com' },
      { name: 'Agencia Surco', address: 'Av. La Encalada 789', phone: '987654323', email: 'surco@example.com' },
      // Más agencias
    ];

    // Inicializar las agencias filtradas con todas las agencias
    this.filteredAgencias = [...this.agencias];
  }

  ngAfterViewInit(): void {
    // Configurar los botones de alternancia del menú lateral (sidebar)
    this.setupToggleButtons();
  }

  // Método para filtrar las agencias basadas en la consulta de búsqueda
  searchLocation(): void {
    if (this.searchQuery.trim() === '') {
      // Si la búsqueda está vacía, mostrar todas las agencias
      this.filteredAgencias = [...this.agencias];
    } else {
      // Filtrar las agencias por nombre o dirección
      const queryLowerCase = this.searchQuery.toLowerCase();
      this.filteredAgencias = this.agencias.filter(agencia =>
        agencia.name.toLowerCase().includes(queryLowerCase) ||
        agencia.address.toLowerCase().includes(queryLowerCase)
      );
    }
  }

  // Navegar a la página de detalles de la agencia
  viewDetails(agencia: any): void {
    this.router.navigate(['/agencia-detalle', agencia.id]); // Redirigir usando el ID de la agencia
  }

  // Método para configurar la funcionalidad de los botones de alternancia del menú lateral
  private setupToggleButtons(): void {
    const sidebar = this.elRef.nativeElement.querySelector('.sidebar');
    const toggleButtons = sidebar.querySelectorAll('.toggle-submenu');

    const closeAllSubmenus = () => {
      sidebar.querySelectorAll('.submenu').forEach((submenu: HTMLElement) => {
        this.renderer.setStyle(submenu, 'display', 'none');
      });
      toggleButtons.forEach((button: HTMLElement) => {
        this.renderer.removeClass(button, 'active');
      });
    };

    toggleButtons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', (e: Event) => {
        e.preventDefault();
        const submenu = button.nextElementSibling as HTMLElement;

        if (submenu.style.display === 'block') {
          this.renderer.setStyle(submenu, 'display', 'none');
          this.renderer.removeClass(button, 'active');
        } else {
          closeAllSubmenus();
          this.renderer.setStyle(submenu, 'display', 'block');
          this.renderer.addClass(button, 'active');
        }
      });
    });

    this.renderer.listen('document', 'click', (e: Event) => {
      if (!sidebar.contains(e.target as Node)) {
        closeAllSubmenus();
      }
    });
  }
}
