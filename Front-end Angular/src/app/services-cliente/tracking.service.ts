// tracking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private apiUrl = 'http://localhost:3000/api/rutas'; // URL of your API

  constructor(private http: HttpClient) { }

  // Get all tracking data
  getAllTrackings(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Get tracking by ID
  getTrackingById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Get tracking info by Codigo and Password
  getTrackingByCodigo(codigoPedido: string, codigo: string, password: string): Observable<any> {
    const params = {
      codigoPedido,
      codigo,
      password
    };
    return this.http.get<any>(this.apiUrl, { params });
  }

  // Validate tracking info
  validateTracking(codigo: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate`, { codigo, password });
  }
}
