import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ElectronicaComponent } from './electronica/electronica.component';
import { BeterwereComponent } from './beterwere/beterwere.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AdminPedidosComponent } from './admin/admin-pedidos/admin-pedidos.component';
import { AdminProductosComponent } from './admin/admin-productos/admin-productos.component';
import { AdminUsuariosComponent } from './admin/admin-usuarios/admin-usuarios.component';
import { AdminEstadisticasComponent } from './admin/admin-estadisticas/admin-estadisticas.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { OfertaService } from './services/oferta.service';
import { AdminService} from './services/admin.service';
import { ProductoService} from './services/producto.service';
import { FiltroUsuariosPipe } from './pipes/filtro-usuarios.pipe';
import { FiltroProductoPipe } from './pipes/filtro-productos.pipe';
import { CarritoElectronicaComponent } from './carrito-electronica/carrito-electronica.component';
import { CarritoBeterwereComponent } from './carrito-beterwere/carrito-beterwere.component';
import { FooterComponent } from './sitebar/footer/footer.component';
import { HeaderComponent } from './sitebar/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ElectronicaComponent,
    BeterwereComponent,
    PerfilComponent,
    PedidosComponent,
    AdminPedidosComponent,
    AdminProductosComponent,
    AdminUsuariosComponent,
    AdminEstadisticasComponent,
    FiltroProductoPipe,
    FiltroUsuariosPipe,
    CarritoElectronicaComponent,
    CarritoBeterwereComponent,
    FooterComponent,
    HeaderComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    OfertaService,
    AuthGuard,
    AdminService,
    ProductoService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
