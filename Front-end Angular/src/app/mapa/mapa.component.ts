import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  template: `
    <div id="map" class="h-96 w-full rounded-lg shadow-lg mb-6">
      <div *ngIf="loading" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: 1.5rem;
    }
  `]
})
export class MapaComponent implements OnInit, OnChanges {
  @Input() origin!: [number, number];
  @Input() destination!: [number, number];
  @Input() currentLocation!: [number, number];
  
  private map!: L.Map;
  private routeLine!: L.Polyline;
  private truckMarker!: L.Marker;
  private originMarker!: L.Marker;
  private destinationMarker!: L.Marker;
  private routePoints: L.LatLng[] = [];
  loading = true;

  private truckIcon = L.icon({
    iconUrl: 'assets/iconos/icono.png', // Asegúrate de tener este ícono
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  private locationIcon = L.icon({
    iconUrl: 'assets/iconos/icono.png', // Asegúrate de tener este ícono
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;

    if (changes['currentLocation'] && this.currentLocation[0] !== 0) {
      this.updateTruckPosition();
    }

    if ((changes['origin'] || changes['destination']) && 
        this.origin[0] !== 0 && this.destination[0] !== 0) {
      this.drawRoute();
      this.addMarkers();
      this.fitBounds();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      zoomControl: true,
      scrollWheelZoom: true
    }).setView([-12.0464, -77.0428], 6); // Centro inicial en Lima

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.loading = false;
  }

  private drawRoute(): void {
    const url = `https://router.project-osrm.org/route/v1/driving/${this.origin[1]},${this.origin[0]};${this.destination[1]},${this.destination[0]}?overview=full&geometries=geojson`;

    this.http.get<any>(url).subscribe(response => {
      if (response.routes && response.routes.length > 0) {
        const coordinates = response.routes[0].geometry.coordinates;
        this.routePoints = coordinates.map((coord: number[]) => L.latLng(coord[1], coord[0]));

        if (this.routeLine) {
          this.map.removeLayer(this.routeLine);
        }

        this.routeLine = L.polyline(this.routePoints, {
          color: '#3B82F6',
          weight: 4,
          opacity: 0.7,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(this.map);

        this.initTruckMarker();
      }
    });
  }

  private initTruckMarker(): void {
    if (!this.truckMarker) {
      this.truckMarker = L.marker(this.origin, {
        icon: this.truckIcon,
        zIndexOffset: 1000
      }).addTo(this.map);
    }
  }

  private updateTruckPosition(): void {
    if (!this.truckMarker) return;

    const newPosition = L.latLng(this.currentLocation[0], this.currentLocation[1]);
    this.truckMarker.setLatLng(newPosition);

    // Calcular rotación del ícono basado en la dirección del movimiento
    if (this.routePoints.length > 1) {
      const currentIndex = this.findClosestPointIndex(newPosition);
      if (currentIndex < this.routePoints.length - 1) {
        const nextPoint = this.routePoints[currentIndex + 1];
        const angle = this.calculateAngle(newPosition, nextPoint);
        this.rotateTruckIcon(angle);
      }
    }

    // Centrar el mapa en la posición actual del camión
    this.map.panTo(newPosition);
  }

  private findClosestPointIndex(position: L.LatLng): number {
    let minDist = Infinity;
    let closestIndex = 0;

    this.routePoints.forEach((point, index) => {
      const dist = position.distanceTo(point);
      if (dist < minDist) {
        minDist = dist;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  private calculateAngle(point1: L.LatLng, point2: L.LatLng): number {
    const dx = point2.lng - point1.lng;
    const dy = point2.lat - point1.lat;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  private rotateTruckIcon(angle: number): void {
    const iconElement = this.truckMarker.getElement();
    if (iconElement) {
      iconElement.style.transform += ` rotate(${angle}deg)`;
    }
  }

  private addMarkers(): void {
    if (this.originMarker) {
      this.map.removeLayer(this.originMarker);
    }
    if (this.destinationMarker) {
      this.map.removeLayer(this.destinationMarker);
    }

    this.originMarker = L.marker(this.origin, {
      icon: this.locationIcon
    }).addTo(this.map);

    this.destinationMarker = L.marker(this.destination, {
      icon: this.locationIcon
    }).addTo(this.map);
  }

  private fitBounds(): void {
    const bounds = L.latLngBounds(this.origin, this.destination);
    this.map.fitBounds(bounds);
  }
}
