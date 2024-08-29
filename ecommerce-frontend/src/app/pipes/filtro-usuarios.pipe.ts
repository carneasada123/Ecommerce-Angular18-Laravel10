import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuarios'
})
export class FiltroUsuariosPipe implements PipeTransform {
  transform(usuarios: any[], filtro: string): any[] {
    if (!filtro || filtro.trim() === '') {
      return usuarios;
    }
    filtro = filtro.toLowerCase();
    return usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(filtro) ||
      usuario.email.toLowerCase().includes(filtro) ||
      usuario.direccion?.toLowerCase().includes(filtro) ||
      usuario.telefono?.toLowerCase().includes(filtro) ||
      usuario.celular?.toLowerCase().includes(filtro)
    );
  }
}
