// tracking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private apiUrl = 'http://localhost:3000/api/tracking'; // Cambia esto con la URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener el tracking por código y contraseña
  getTracking(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getTrackingByCodigoYClave(codigo: string, clave: string): Observable<any> {
    const params = new HttpParams().set('codigo', codigo).set('contraseña', clave);
    return this.http.get<any>(`${this.apiUrl}/buscar`, { params });
  }
}