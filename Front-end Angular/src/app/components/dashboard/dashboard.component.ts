import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface District {
  name: string;
  zone: 'Norte' | 'Sur' | 'Este' | 'Oeste' | 'Centro';
}

interface Tarifa {
  id: number;
  origen: string;
  destino: string;
  precio: number;
  tiempoEntrega: string;
  tipoEnvio: 'Económico' | 'Estándar' | 'Express';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Lima Districts by Zone
  limaDistricts: District[] = [
    // Norte
    { name: 'Ancón', zone: 'Norte' },
    { name: 'Puente Piedra', zone: 'Norte' },
    { name: 'San Martín de Porres', zone: 'Norte' },
    { name: 'Los Olivos', zone: 'Norte' },

    // Sur
    { name: 'Chorrillos', zone: 'Sur' },
    { name: 'San Juan de Miraflores', zone: 'Sur' },
    { name: 'Villa El Salvador', zone: 'Sur' },
    { name: 'Surco', zone: 'Sur' },

    // Este
    { name: 'Ate', zone: 'Este' },
    { name: 'Chaclacayo', zone: 'Este' },
    { name: 'Cieneguilla', zone: 'Este' },
    { name: 'Santa Anita', zone: 'Este' },

    // Oeste
    { name: 'Carabayllo', zone: 'Oeste' },
    { name: 'Comas', zone: 'Oeste' },
    { name: 'San Miguel', zone: 'Oeste' },
    { name: 'Independencia', zone: 'Oeste' },

    // Centro
    { name: 'Cercado de Lima', zone: 'Centro' },
    { name: 'Jesús María', zone: 'Centro' },
    { name: 'Lince', zone: 'Centro' },
    { name: 'Lima', zone: 'Centro' }
  ];

  cotizacionForm!: FormGroup;
  tarifasResultado: Tarifa[] = [];
  busquedaRealizada = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.cotizacionForm = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      peso: [0, [Validators.required, Validators.min(0.1)]],
      tipoEnvio: ['Estándar', Validators.required]
    });
  }

  calcularTarifas() {
    if (this.cotizacionForm.invalid) {
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const { origen, destino, peso, tipoEnvio } = this.cotizacionForm.value;

    // Simulación de cálculo de tarifas basado en distritos y zonas
    this.tarifasResultado = this.generarTarifas(origen, destino, peso, tipoEnvio);
    this.busquedaRealizada = true;
  }

  generarTarifas(origen: string, destino: string, peso: number, tipoEnvio: string): Tarifa[] {
    const basePrice = 10; // Precio base
    const multiplicadorZona = this.calcularMultiplicadorZona(origen, destino);
    const multiplicadorPeso = this.calcularMultiplicadorPeso(peso);
    const multiplicadorTipo = this.calcularMultiplicadorTipo(tipoEnvio);

    return [
      {
        id: 1,
        origen,
        destino,
        precio: Math.round(basePrice * multiplicadorZona * multiplicadorPeso * multiplicadorTipo),
        tiempoEntrega: this.calcularTiempoEntrega(tipoEnvio),
        tipoEnvio: tipoEnvio as any
      },
      {
        id: 2,
        origen,
        destino,
        precio: Math.round(basePrice * multiplicadorZona * multiplicadorPeso * multiplicadorTipo * 1.5),
        tiempoEntrega: this.calcularTiempoEntrega(tipoEnvio),
        tipoEnvio: 'Express' as any
      }
    ];
  }

  calcularMultiplicadorZona(origen: string, destino: string): number {
    const origenZone = this.limaDistricts.find(d => d.name === origen)?.zone;
    const destinoZone = this.limaDistricts.find(d => d.name === destino)?.zone;

    if (origenZone === destinoZone) return 1;
    if (origenZone !== destinoZone) return 1.5;
    
    return 2; // Zonas muy distantes
  }

  calcularMultiplicadorPeso(peso: number): number {
    if (peso <= 5) return 1;
    if (peso <= 10) return 1.3;
    if (peso <= 20) return 1.6;
    return 2;
  }

  calcularMultiplicadorTipo(tipoEnvio: string): number {
    switch(tipoEnvio) {
      case 'Económico': return 0.8;
      case 'Estándar': return 1;
      case 'Express': return 1.5;
      default: return 1;
    }
  }

  calcularTiempoEntrega(tipoEnvio: string): string {
    switch(tipoEnvio) {
      case 'Económico': return '3-5 días';
      case 'Estándar': return '1-2 días';
      case 'Express': return '12-24 horas';
      default: return '2-3 días';
    }
  }

  verDetalles(tarifa: Tarifa) {
    // Implementar navegación a detalles de tarifa
    console.log('Detalles de tarifa:', tarifa);
  }
}