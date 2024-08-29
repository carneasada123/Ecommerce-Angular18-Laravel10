import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { ProductoService } from '../services/producto.service'; 
import { AuthService } from '../auth.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-electronica',
  templateUrl: './electronica.component.html',
  styleUrls: ['./electronica.component.css']
})
export class ElectronicaComponent implements OnInit, AfterViewChecked {
  productos: any[] = [];
  filtro: string = '';     // Variable para almacenar el término de búsqueda
  productoIdResaltado: number | null = null;
  isResaltadoAplicado: boolean = false;
  mostrarModal: boolean = false;  // Variable para mostrar/ocultar el modal
  productoSeleccionado: any = null;  // Producto seleccionado para mostrar en el modal
  
  
  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

   //funcion de ventanas modales
   abrirVentanaFlotante(producto: any): void {
    this.productoSeleccionado = producto;  // Asigna el producto seleccionado
    this.mostrarModal = true;  // Muestra el modal
  }

   // Función para cerrar el modal
   cerrarVentanaFlotante(): void {
    this.mostrarModal = false;  // Oculta el modal
    this.productoSeleccionado = null;  // Limpia el producto seleccionado
  }

  ngOnInit(): void {
    this.cargarProductos();

    // Captura el parámetro 'producto' desde la URL
    this.route.queryParams.subscribe(params => {
      this.productoIdResaltado = params['producto'] ? +params['producto'] : null;
    });
  }
  

  cargarProductos(): void {
    this.productoService.obtenerProductosElectronica().subscribe(
      (data: any[]) => {
        this.productos = data;
        this.isResaltadoAplicado = false;
      },
      (error) => {
        console.error('Error al cargar los productos de electrónica', error);
      }
    );
  }

  ngAfterViewChecked(): void {
    // Comprobamos si el resaltado ya ha sido aplicado
    if (this.productoIdResaltado && !this.isResaltadoAplicado) {
      this.resaltarProducto();
    }
  }

  resaltarProducto(): void {
    console.log(`Intentando resaltar el producto con ID: ${this.productoIdResaltado}`);
  
    setTimeout(() => {
      const elemento = document.getElementById(`producto-${this.productoIdResaltado}`);
      console.log(elemento); // Verifica si el elemento es encontrado
  
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        elemento.classList.add('resaltado');
        this.isResaltadoAplicado = true;
      } else {
        console.log('El elemento no fue encontrado en el DOM');
      }
    }, 100); // Retraso de 100ms para asegurarse de que el DOM esté renderizado
  }

  agregarAlCarrito(producto: any): void {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Iniciar sesión',
        text: 'Debes iniciar sesión para agregar productos al carrito.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    }

    const categoria = 'electronica';
    this.carritoService.agregarProductoAlCarrito(producto.id, categoria, 1).subscribe(
      response => {
        console.log('Producto agregado al carrito:', response);
      },
      error => {
        console.error('Error al agregar producto:', error);
      }
    );
  }
}
