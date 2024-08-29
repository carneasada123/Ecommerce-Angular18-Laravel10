import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:8000/api';  // URL base de la API para las solicitudes del carrito

  constructor(private http: HttpClient) {}

  // Método para obtener los encabezados HTTP de autorización, utilizando el token almacenado en el localStorage
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Método para obtener los productos en el carrito por categoría (Electrónica o Beterwere)
  obtenerCarrito(categoria: string): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/carrito/${categoria}`;  // Pasa la categoría seleccionada en la URL
    return this.http.get(url, { headers });
  }

  // Método para agregar un producto al carrito, en la categoría específica
agregarProductoAlCarrito(producto_id: number, categoria: string, cantidad: number): Observable<any> {
  const headers = this.getHeaders();

  // Realiza la solicitud POST al backend para agregar el producto al carrito en la categoría adecuada
  const url = `${this.apiUrl}/carrito/${categoria}`;  // Actualiza la ruta con la categoría específica
  return this.http.post(url, { producto_id, cantidad }, { headers });
}

  // Método para eliminar un producto del carrito
  eliminarProductoDelCarrito(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/carrito/${id}`, { headers });  // Realiza la solicitud DELETE al backend para eliminar un producto del carrito
  }

  // Método para realizar el pedido, enviando el tipo de pago y la categoría seleccionada
  realizarPedido(tipoPago: string, categoria: string): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/pedidos/${categoria}`;
    return this.http.post(url, { tipo_pago: tipoPago }, { headers });
  }

  // Método para limpiar el carrito de una categoría específica después de completar el pedido
  limpiarCarrito(categoria: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/carrito/limpiar/${categoria}`, { headers });
  }
}
