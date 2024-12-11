import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  private apiUrl = 'http://localhost:3000/api/rutas'; 

  constructor(private http: HttpClient) {}

  // Obtener todas las rutas
  getRutas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar una nueva ruta
  agregarRuta(ruta: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl, ruta, { headers });
  }

  // Editar una ruta
  editarRuta(Ruta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${Ruta.id}`, Ruta);
  }
  

  // Eliminar una ruta
  eliminarRuta(idRuta: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idRuta}`);
  }
}
