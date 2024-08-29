import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';  
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-electronica',
  templateUrl: './carrito-electronica.component.html',
  styleUrls: ['./carrito-electronica.component.css']
})
export class CarritoElectronicaComponent implements OnInit {
  carrito: any[] = [];
  total: number = 0;
  tipoPago: string = '';

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carritoService.obtenerCarrito('electronica').subscribe(
      data => {
        this.carrito = data;
        this.calcularTotal();
      },
      error => {
        console.error('Error al cargar el carrito de electrónica', error);
      }
    );
  }

  eliminarProductoDelCarrito(productoId: number): void {
    this.carritoService.eliminarProductoDelCarrito(productoId).subscribe(() => {
      this.carrito = this.carrito.filter(item => item.id !== productoId);
      this.calcularTotal();
    });
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((acc, item) => {
      const precio = item.producto?.precio || 0;
      return acc + (precio * item.cantidad);
    }, 0);
  }

  realizarPedido(): void {
    this.carritoService.realizarPedido(this.tipoPago, 'electronica').subscribe(
      response => {
        Swal.fire('¡Pedido realizado!', 'Tu pedido ha sido procesado exitosamente.', 'success');
        this.carrito = [];
        this.total = 0;
      },
      error => {
        Swal.fire('Error', 'Ocurrió un problema al realizar el pedido.', 'error');
      }
    );
  }
}
