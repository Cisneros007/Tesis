import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  private apiUrl = 'http://localhost:3000/api/rutas'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) { }

  getRutas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
