import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements AfterViewInit {
  tarifas = [];
  origen: string = '';
  destino: string = '';
  buscarRealizado: boolean = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2, private router: Router) {
    // Inicializa algunas tarifas de ejemplo solo para Perú
   
  }

  ngAfterViewInit(): void {
    this.setupToggleButtons();
  }

  buscarTarifas(): void {
    // Aquí puedes implementar la lógica para buscar tarifas reales según el origen y destino
    // Por simplicidad, simplemente configuramos el estado de la búsqueda
    this.buscarRealizado = true;

    // Aquí puedes filtrar las tarifas según el origen y destino
    // Por ahora, simplemente se mostrará la tabla con los datos de ejemplo
  }

  viewDetails(tarifa: any): void {
    // Redirige a la página de detalles de la tarifa
    this.router.navigate(['/tarifa-detalle', tarifa.id]);
  }

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
