import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pagalo',
  templateUrl: './pagalo.component.html',
  styleUrls: ['./pagalo.component.css']
})
export class PagaloComponent implements AfterViewInit {
goBack() {
throw new Error('Method not implemented.');
}
cancelPayment() {
throw new Error('Method not implemented.');
}
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

    if (this.paymentDetails.method) {
      this.trackingNumber = this.generateTrackingNumber();
      this.paymentSuccess = true; // El pago se realizó con éxito
      alert('Pago realizado con éxito! Tu número de seguimiento es: ' + this.trackingNumber);
    } else {
      alert('Por favor, selecciona un método de pago.');
    }
  }

  downloadReceipt() {
    if (!this.paymentSuccess) {
      alert('Debes completar el pago antes de descargar el comprobante.');
      return;
    }
  
    const doc = new jsPDF();
    
    // Company Logo and Header
    doc.setFillColor(41, 128, 185); // Blue background for header
    doc.rect(0, 0, 210, 30, 'F');
    
    // Add company logo (you would need to import or add the logo to your project)
    // doc.addImage(logoPath, 'PNG', 10, 5, 30, 20);
    
    doc.setTextColor(255, 255, 255); // White text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Envios facil', 160, 15);
    doc.text('Comprobante de Pago', 10, 20, { align: 'left' });
  
    // Reset text color and font
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
  
    // Payment Details Section
    doc.setFillColor(240, 240, 240);
    doc.rect(10, 40, 190, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Detalles del Pago', 15, 47);
  
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    // Detailed Payment Information
    const startY = 60;
    const lineHeight = 7;
    doc.text(`Código de Orden: ${this.paymentDetails.orderCode}`, 15, startY);
    doc.text(`Método de Pago: ${this.paymentDetails.method.toUpperCase()}`, 15, startY + lineHeight);
    doc.text(`Número de Seguimiento: ${this.trackingNumber}`, 15, startY + lineHeight * 2);
  
    // Conditional Card Details (for BCP)
    if (this.paymentDetails.method === 'bcp') {
      doc.text(`Número de Tarjeta: **** **** **** ${this.paymentDetails.cardNumber.slice(-4)}`, 15, startY + lineHeight * 3);
      doc.text(`Fecha de Expiración: ${this.paymentDetails.cardExpiry}`, 15, startY + lineHeight * 4);
    }
  
    // Footer
    doc.setLineWidth(0.5);
    doc.line(10, 280, 200, 280);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.text('Gracias por tu compra - Págalo © ' + new Date().getFullYear(), 105, 290, { align: 'center' });
  
    // Add a subtle border
    doc.rect(5, 5, 200, 287);
  
    // Save the PDF
    doc.save('comprobante_pago.pdf');
  }

  private generateTrackingNumber(): string {
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
