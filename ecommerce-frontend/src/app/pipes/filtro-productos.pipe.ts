import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProducto'
})
export class FiltroProductoPipe implements PipeTransform {

  transform(productos: any[], terminoBusqueda: string, productoIdResaltado: number | null): any[] {
    if (!productos) {
      return productos;  // Si no hay productos, retorna la lista completa
    }

    if (!terminoBusqueda && !productoIdResaltado) {
      return productos;  // Si no hay término de búsqueda ni producto resaltado, retorna la lista completa
    }

    // Normaliza el término de búsqueda a minúsculas
    terminoBusqueda = terminoBusqueda ? terminoBusqueda.toLowerCase() : '';

    // Filtra los productos
    return productos.filter(producto =>
      producto.id === productoIdResaltado || // Mantén visible el producto resaltado
      producto.nombre.toLowerCase().includes(terminoBusqueda) ||
      producto.descripcion.toLowerCase().includes(terminoBusqueda) ||
      producto.precio.toString().includes(terminoBusqueda)
    );
  }
}
