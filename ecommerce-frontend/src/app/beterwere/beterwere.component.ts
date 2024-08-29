import { Component, OnInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { ProductoService } from '../services/producto.service'; 
import { AuthService } from '../auth.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-beterwere',
  templateUrl: './beterwere.component.html',
  styleUrls: ['./beterwere.component.css']
})
export class BeterwereComponent implements OnInit, AfterViewChecked {
  
  isResaltadoAplicado: boolean = false;  // Bandera para asegurarse de que el resaltado solo se aplique una vez
  productos: any[] = [];  // Almacena la lista de productos de la categoría "beterwere"
  productoIdResaltado: number | null = null;  // Almacena el ID del producto que debe ser resaltado
  mostrarModal: boolean = false;  // Variable para mostrar/ocultar el modal
  productoSeleccionado: any = null;  // Producto seleccionado para mostrar en el modal
  filtro: string = '';


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
    // Capturamos el parámetro 'producto' de la URL (si está presente)
    // Esto se utiliza para determinar qué producto debe ser resaltado
    this.route.queryParams.subscribe(params => {
      this.productoIdResaltado = params['producto'] ? +params['producto'] : null;
    });

    // Cargar los productos de la categoría "beterwere"
    this.cargarProductos();
  }

  cargarProductos(): void {
    // Obtiene los productos de "beterwere" desde el servicio del backend
    this.productoService.obtenerProductosBeterwere().subscribe(
      (data: any[]) => {
        this.productos = data;  // Almacena los productos obtenidos en la variable `productos`
        this.isResaltadoAplicado = false;  // Reinicia la bandera para permitir el resaltado
      },
      (error) => {
        console.error('Error al cargar los productos de beterwere', error);  // Muestra errores si ocurre alguno al cargar los productos
      }
    );
  }

  // Este método se ejecuta cada vez que Angular verifica y actualiza las vistas
  // Se utiliza para aplicar el resaltado después de que las vistas han sido renderizadas
  ngAfterViewChecked(): void {
    // Si hay un producto que debe ser resaltado y el resaltado no se ha aplicado aún
    if (this.productoIdResaltado && !this.isResaltadoAplicado) {
      this.resaltarProducto();  // Llama a la función para resaltar el producto
    }
  }

  resaltarProducto(): void {
    // Busca el elemento en el DOM correspondiente al producto resaltado
    const elemento = document.getElementById(`producto-${this.productoIdResaltado}`);
    if (elemento) {
      // Si el elemento existe, lo desplaza a la vista y le agrega la clase de resaltado
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });  // Desplaza la vista hacia el elemento resaltado
      elemento.classList.add('resaltado');  // Aplica la clase 'resaltado' para destacar visualmente el producto
      this.isResaltadoAplicado = true;  // Marca que el resaltado ha sido aplicado para evitar repetidos resaltados
    }
  }

  agregarAlCarrito(producto: any): void {
    // Comprueba si el usuario ha iniciado sesión (verificando el token en localStorage)
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no ha iniciado sesión, muestra un mensaje de advertencia y redirige al usuario a la página de login
      Swal.fire({
        icon: 'warning',
        title: 'Iniciar sesión',
        text: 'Debes iniciar sesión para agregar productos al carrito.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
      });
      return;  // Detiene la ejecución si no hay sesión iniciada
    }

    // Si el usuario está autenticado, llama al servicio para agregar el producto al carrito
    this.carritoService.agregarProductoAlCarrito(producto.id, 'beterwere', 1).subscribe(
      response => {
        console.log('Producto agregado al carrito:', response);  // Muestra un mensaje de éxito en la consola
      },
      error => {
        console.error('Error al agregar producto:', error);  // Muestra un mensaje de error si ocurre algún problema al agregar el producto
      }
    );
  }
}
