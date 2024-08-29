import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ElectronicaComponent } from './electronica/electronica.component';
import { BeterwereComponent } from './beterwere/beterwere.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AdminPedidosComponent } from './admin/admin-pedidos/admin-pedidos.component';
import { AdminProductosComponent } from './admin/admin-productos/admin-productos.component';
import { AdminUsuariosComponent } from './admin/admin-usuarios/admin-usuarios.component';
import { AdminEstadisticasComponent } from './admin/admin-estadisticas/admin-estadisticas.component';
import { AuthGuard } from './auth.guard'; 
import { CarritoBeterwereComponent } from './carrito-beterwere/carrito-beterwere.component';
import { CarritoElectronicaComponent } from './carrito-electronica/carrito-electronica.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'electronica', component: ElectronicaComponent },
  { path: 'beterwere', component: BeterwereComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'carrito-electronica', component: CarritoElectronicaComponent },
  { path: 'carrito-beterwere', component: CarritoBeterwereComponent },
  
  // Rutas de administración protegidas por AuthGuard
  { path: 'admin/pedidos', component: AdminPedidosComponent, canActivate: [AuthGuard] },
  { path: 'admin/productos', component: AdminProductosComponent, canActivate: [AuthGuard] },
  { path: 'admin/productos/nuevo', component: AdminProductosComponent, canActivate: [AuthGuard] },
  { path: 'admin/usuarios', component: AdminUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'admin/estadisticas', component: AdminEstadisticasComponent, canActivate: [AuthGuard] },

  // Ruta comodín para redirigir a la página de inicio en caso de rutas no encontradas
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
