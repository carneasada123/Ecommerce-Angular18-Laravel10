import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';  
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-beterwere',
  templateUrl: './carrito-beterwere.component.html',
  styleUrls: ['./carrito-beterwere.component.css']
})
export class CarritoBeterwereComponent implements OnInit {
  carrito: any[] = [];
  total: number = 0;
  tipoPago: string = '';

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carritoService.obtenerCarrito('beterwere').subscribe(
      data => {
        this.carrito = data;
        this.calcularTotal();
      },
      error => {
        console.error('Error al cargar el carrito de beterwere', error);
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
    this.carritoService.realizarPedido(this.tipoPago, 'beterwere').subscribe(
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
