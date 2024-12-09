import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-pagalo',
  templateUrl: './pagalo.component.html',
  styleUrls: ['./pagalo.component.css']
})
export class PagaloComponent {
  paymentDetails = {
    orderCode: '',
    method: '',
    password: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  };

  selectPaymentMethod(method: string) {
    this.paymentDetails.method = method;
  }

  clearForm() {
    this.paymentDetails = {
      orderCode: '',
      method: '',
      password: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: ''
    };
  }

  onSubmit() {
    if (this.paymentDetails.method) {
      this.generateReceipt();
    }
  }

  generateReceipt() {
    const doc = new jsPDF();
    doc.text('Recibo de Pago', 20, 20);
    doc.text(`Código de Orden: ${this.paymentDetails.orderCode}`, 20, 30);
    doc.text(`Método de Pago: ${this.paymentDetails.method.toUpperCase()}`, 20, 40);
    doc.text(`Clave: ${this.paymentDetails.password}`, 20, 50);
    doc.save('recibo_pago.pdf');
  }
}
