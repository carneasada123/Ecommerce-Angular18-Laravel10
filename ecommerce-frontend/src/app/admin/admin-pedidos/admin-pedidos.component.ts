import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrls: ['./admin-pedidos.component.css']
})
export class AdminPedidosComponent implements OnInit {
  pedidos: any[] = [];
  mostrarModal = false;
  mostrarModalEstado = false;
  mostrarModalFecha = false;
  pedidoSeleccionado: any = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  // Obtener la lista de pedidos
  obtenerPedidos(): void {
    this.adminService.obtenerPedidos().subscribe(
      (response: any) => {
        this.pedidos = response;
      },
      error => {
        console.error('Error al obtener los pedidos:', error);
      }
    );
  }

  // Abrir modal para ver los detalles
  abrirModal(pedido: any): void {
    this.pedidoSeleccionado = pedido;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.pedidoSeleccionado = null;
  }

  // Abrir modal para cambiar estado
  abrirModalEstado(pedido: any): void {
    this.pedidoSeleccionado = pedido;
    this.mostrarModalEstado = true;
  }

  cerrarModalEstado(): void {
    this.mostrarModalEstado = false;
    this.pedidoSeleccionado = null;
  }

  // Abrir modal para asignar fecha
  abrirModalFecha(pedido: any): void {
    this.pedidoSeleccionado = pedido;
    this.mostrarModalFecha = true;
  }

  cerrarModalFecha(): void {
    this.mostrarModalFecha = false;
    this.pedidoSeleccionado = null;
  }

  // Cancelar pedido
  cancelarPedido(pedidoId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { estado: 'cancelado' };
        this.adminService.actualizarPedido(pedidoId, data).subscribe(
          response => {
            Swal.fire('Cancelado', 'El pedido ha sido cancelado.', 'success');
            this.obtenerPedidos();  // Refrescar la lista de pedidos después de la cancelación
          },
          error => {
            console.error('Error al cancelar el pedido:', error);
            Swal.fire('Error', 'Hubo un problema al cancelar el pedido', 'error');
          }
        );
      }
    });
  }

  // Actualizar estado
  actualizarEstado(pedidoId: number, estado: string, fecha_entrega?: string): void {
    // Crear un objeto que siempre incluya el estado
    const data: { estado: string, fecha_entrega?: string } = { estado };
  
    // Si el estado es "fecha asignada" y la fecha de entrega está definida, agrégala a los datos
    if (estado === 'fecha asignada' && fecha_entrega) {
      data.fecha_entrega = fecha_entrega;
    }
  
    // Llamar al servicio con los datos que pueden incluir o no la fecha de entrega
    this.adminService.actualizarPedido(pedidoId, data).subscribe(
      response => {
        Swal.fire('Éxito', 'Estado del pedido actualizado', 'success');
        this.obtenerPedidos();  // Refrescar la lista de pedidos
        this.cerrarModalEstado();  // Cerrar el modal después de actualizar
        this.cerrarModalFecha();   // Cerrar el modal de fecha si estaba abierto
      },
      error => {
        console.error('Error al actualizar el estado del pedido:', error);
      }
    );
  }

}