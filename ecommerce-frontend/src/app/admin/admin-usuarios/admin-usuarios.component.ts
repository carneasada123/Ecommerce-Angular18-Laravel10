import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  filtro: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.adminService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  desactivarUsuario(id: string): void {
    this.adminService.desactivarUsuario(id).subscribe(() => {
      this.cargarUsuarios(); // Refrescar la lista después de desactivar
    });
  }
  activarUsuario(id: string): void {
    this.adminService.activarUsuario(id).subscribe(() => {
      this.cargarUsuarios(); // Refrescar lista de usuarios
    });
  }
}
