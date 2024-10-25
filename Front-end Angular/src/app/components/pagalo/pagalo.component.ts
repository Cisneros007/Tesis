import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pagalo',
  templateUrl: './pagalo.component.html',
  styleUrls: ['./pagalo.component.css']
})
export class PagaloComponent implements AfterViewInit {
  paymentDetails = {
    orderCode: '',
    password: '',
    method: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  };

  paymentSuccess: boolean = false;
  trackingNumber: string = '';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setupToggleButtons();
  }

  selectPaymentMethod(method: string) {
    this.paymentDetails.method = method;
    console.log(`Método de pago seleccionado: ${method}`);
  }

  onSubmit() {
    console.log('Procesando pago con detalles:', this.paymentDetails);

    // Simulación de procesamiento de pago
    if (this.paymentDetails.method) {
      this.trackingNumber = this.generateTrackingNumber();
      // Mostrar mensaje de éxito y número de seguimiento
      this.paymentSuccess = true;
      alert('Pago realizado con éxito! Tu número de seguimiento es: ' + this.trackingNumber);
    } else {
      alert('Por favor, selecciona un método de pago.');
    }
  }

  private generateTrackingNumber(): string {
    // Generar un número de seguimiento aleatorio como ejemplo
    return 'TRK-' + Math.floor(Math.random() * 1000000).toString();
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
