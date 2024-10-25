import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agencia-detalle',
  templateUrl: './agencia-detalle.component.html',
  styleUrls: ['./agencia-detalle.component.css']
})
export class AgenciaDetalleComponent implements OnInit {
  agencia: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    // Aquí puedes hacer una llamada a un servicio para obtener los detalles de la agencia
    // Simulamos con datos estáticos
    // En una aplicación real, necesitarías llamar a un servicio para obtener los datos de la agencia
    this.agencia = {
      id: id,
      name: 'Agencia Central',
      address: 'Av. Principal 123, Ciudad Capital',
      phone: '(01) 234-5678',
      email: 'central@agencias.com'
    };
  }
}
