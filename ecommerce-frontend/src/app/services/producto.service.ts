import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // URL base de la API
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Obtener productos de Electrónica
  obtenerProductosElectronica(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos/electronica`);
  }

  // Obtener productos de Beterwere
  obtenerProductosBeterwere(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos/beterwere`);
  }
}

