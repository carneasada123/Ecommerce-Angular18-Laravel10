import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  productos: any[] = [];
  mostrarFormulario: boolean = false;
  productoSeleccionado: any = null; 
  
  nuevoProducto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    categoria: 'electronica',
    estado: true,
    oferta: false,
    foto: null,
    codigo: ''
  };

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nuevoProducto.foto = file;
    }
  }

  agregarProducto() {
    const formData = new FormData();
    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('descripcion', this.nuevoProducto.descripcion);
    formData.append('precio', this.nuevoProducto.precio.toString());
    formData.append('cantidad', this.nuevoProducto.cantidad.toString());
    formData.append('categoria', this.nuevoProducto.categoria);
    formData.append('estado', this.nuevoProducto.oferta ? '1' : '0');
    formData.append('oferta', this.nuevoProducto.oferta ? '1' : '0');
    formData.append('codigo', this.nuevoProducto.codigo.toString());

    if (this.nuevoProducto.foto) {
      formData.append('foto', this.nuevoProducto.foto);
    }

    this.adminService.agregarProducto(formData).subscribe(response => {
      this.router.navigate(['/admin/productos']);
      this.obtenerProductos(); // Actualiza la lista de productos
      this.mostrarFormulario = false; // Cierra el formulario de agregar producto
    }, error => {
      console.error('Error al agregar producto', error);
    });    
  }

  obtenerProductos() {
    this.adminService.obtenerProductos().subscribe(response => {
      this.productos = response;
    }, error => {
      console.error('Error al obtener productos', error);
    });
  }

  desactivarProducto(id: number) {
    this.adminService.desactivarProducto(id).subscribe(response => {
      this.obtenerProductos();
    }, error => {
      console.error('Error al desactivar producto', error);
    });
  }
  editarProducto(producto: any) {
    this.productoSeleccionado = { ...producto }; // Clonar el producto seleccionado
    this.mostrarFormulario = false; // Ocultar el formulario de nuevo producto
  }
  
  actualizarProducto() {
    const formData = new FormData();
    formData.append('nombre', this.productoSeleccionado.nombre);
    formData.append('descripcion', this.productoSeleccionado.descripcion);
    formData.append('precio', this.productoSeleccionado.precio.toString());
    formData.append('cantidad', this.productoSeleccionado.cantidad.toString());
    formData.append('categoria', this.productoSeleccionado.categoria);
    formData.append('estado', this.productoSeleccionado.estado ? '1' : '0');
    formData.append('oferta', this.productoSeleccionado.oferta ? '1' : '0');
    formData.append('codigo', this.nuevoProducto.codigo.toString());
    
    if (this.productoSeleccionado.foto instanceof File) {
      formData.append('foto', this.productoSeleccionado.foto);
    }
  
    this.adminService.updateProducto(this.productoSeleccionado.id, formData).subscribe(response => {
      this.obtenerProductos(); // Actualizar la lista de productos
      this.productoSeleccionado = null; // Limpiar la selección después de guardar
    }, error => {
      console.error('Error al actualizar producto', error);
    });
  }
  
  cancelarEdicion() {
    this.productoSeleccionado = null; // Limpiar la selección y cerrar el formulario
  }
  
}
