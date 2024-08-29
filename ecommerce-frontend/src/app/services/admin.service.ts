import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // URL base para las peticiones de administrador
  private apiUrl = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient) {}

  // Método privado para obtener los encabezados de autenticación
  private obtenerEncabezadosAutenticacion(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    //console.log('Token enviado:', token);  // Verificar el token enviado
   // if (!token) {
        //console.error('Token no encontrado, por favor inicia sesión');
        // Podrías redirigir al login o lanzar un error
    //}
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // ------------------- Pedidos -------------------

  // Obtener la lista de todos los pedidos
  obtenerPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedidos`, this.obtenerEncabezadosAutenticacion())
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.error('Token inválido o expirado');
            // Manejar redirección o mensaje de error
          }
          return throwError(error);
        })
      );
  }

  // Obtener los detalles de un pedido específico por su ID
  obtenerPedido(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pedidos/${id}`, this.obtenerEncabezadosAutenticacion());
  }

  // Actualizar el estado de un pedido específico por su ID
  actualizarPedido(id: number, data: { estado: string, fecha_entrega?: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pedidos/${id}/estado`, data, this.obtenerEncabezadosAutenticacion());
  }

  // ------------------- Productos -------------------

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`, this.obtenerEncabezadosAutenticacion());
  }

  agregarProducto(datosProducto: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/productos`, datosProducto, this.obtenerEncabezadosAutenticacion());
  }

  desactivarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${id}`, this.obtenerEncabezadosAutenticacion());
  }

  updateProducto(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/productos/${id}`, data, this.obtenerEncabezadosAutenticacion());
  }

  // ------------------- Usuarios -------------------

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`, this.obtenerEncabezadosAutenticacion());
  }

  obtenerUsuario(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`, this.obtenerEncabezadosAutenticacion());
  }

  desactivarUsuario(id: string | number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/desactivar/${id}`, {}, this.obtenerEncabezadosAutenticacion());
  }

  activarUsuario(id: string | number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/activar/${id}`, {}, this.obtenerEncabezadosAutenticacion());
  }

  // ------------------- Estadísticas -------------------

  getEstadisticas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estadisticas`, this.obtenerEncabezadosAutenticacion());
  }
}
