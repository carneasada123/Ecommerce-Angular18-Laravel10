import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8000/api';  // URL base de la API

  constructor(private http: HttpClient) {}

  // Crear un pedido con el tipo de pago especificado
  crearPedido(tipoPago: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pedidos`, { tipoPago });
  }

  // Obtener la lista de pedidos
  obtenerPedidos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/pedidos`);  // URL para obtener los pedidos
  }

  // Actualizar el estado de un pedido en el servidor
  updateEstadoPedido(pedidoId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/pedidos/${pedidoId}/estado`, data);
  }
}
