import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommercefrontend';
  menuVisible: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  // Método para alternar la visibilidad del menú (para el menú de cliente)
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  // Método para cerrar el menú hamburguesa
  closeMenu(): void {
    this.menuVisible = false;
  }

  // Verifica si el usuario está logueado
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Verifica si el usuario es administrador
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // Método para determinar si una ruta está activa
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
    this.closeMenu(); // Cierra el menú después de cerrar sesión
    this.router.navigate(['/login']); // Redirigir al login
  }
}
