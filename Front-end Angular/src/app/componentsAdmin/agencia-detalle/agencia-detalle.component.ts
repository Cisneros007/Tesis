import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agencia-detalle',
  templateUrl: './agencia-detalle.component.html',
  styleUrls: ['./agencia-detalle.component.css']
})
export class AgenciaDetalleComponent implements OnInit {
  agencia: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    // Simulamos con datos estáticos
    this.agencia = {
      id: id,
      name: 'Agencia Central',
      address: 'Av. Principal 123, Ciudad Capital',
      phone: '(01) 234-5678',
      email: 'central@agencias.com'
    };
  }

  goBack(): void {
    this.router.navigate(['/agencias']); // Asegúrate de que esta ruta sea correcta
  }
}
