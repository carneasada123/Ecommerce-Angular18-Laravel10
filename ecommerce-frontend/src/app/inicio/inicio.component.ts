import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { OfertaService } from '../services/oferta.service';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    nombre: '',
    direccion: '',
    telefono: '',
    celular: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  showLogin = false;
  showRegister = false;
  showClientMenu = false;
  validationErrors: any = {};
  ofertas: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private ofertaService: OfertaService,
    private emailService: EmailService // Inyecta el servicio de email
  ) {}

  ngOnInit(): void {
    this.obtenerOfertas();//obtiene los productos registrados como ofertas
    this.showClientMenu = this.authService.isLoggedIn() && !this.authService.isAdmin();//verifica si el usuario ya esta logueado y no es administrador
  }

  toggleLogin(): void {
    this.showLogin = !this.showLogin;
    this.showRegister = false;
    if (this.showLogin) {
      document.querySelector('.access-container')?.classList.add('move-down');
    } else {
      document.querySelector('.access-container')?.classList.remove('move-down');
    }
  }

  toggleRegister(): void {
    this.showRegister = !this.showRegister;
    this.showLogin = false;
    //controla la posicion de la ventana
    if (this.showRegister) {
      document.querySelector('.access-container')?.classList.add('move-down');
    } else {
      document.querySelector('.access-container')?.classList.remove('move-down');
    }
  }

  onLoginSubmit(): void {
    this.authService.login(this.loginData).subscribe(response => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario', JSON.stringify(response.usuario)); // Guarda el usuario

      if (response.usuario.rol === 'admin') {
        this.router.navigate(['/admin']);//mostrar opciones admin
      } else {
        this.router.navigate(['/']);
        this.showClientMenu = true; // Mostrar menú de cliente si no es administrador
      }
    }, error => {
      console.error('Error en el inicio de sesión', error);
    });
  }

  onRegisterSubmit(): void {
    this.authService.register(this.registerData).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/admin']);

      // Enviar correo electrónico después del registro
      this.emailService.sendRegistrationEmail(this.registerData).subscribe(
        emailResponse => {
          console.log('Correo enviado con éxito', emailResponse);
        },
        error => {
          console.error('Error al enviar el correo', error);
        }
      );

    }, error => {
      if (error.status === 422) {
        this.validationErrors = error.error.errors;
      } else {
        console.error('Error en el registro', error);
      }
    });
  }
//Seccion Ofertas
  obtenerOfertas(): void {
    this.ofertaService.getOfertas().subscribe(response => {
      this.ofertas = response;
    }, error => {
      console.error('Error al obtener las ofertas', error);
    });
  }

  verOferta(oferta: any): void {
    const categoria = oferta.categoria;  // "electronica" o "beterwere"
    const productoId = oferta.id;

    // Redirigir a la categoría con el ID del producto como query param
    this.router.navigate([`/${categoria}`], { queryParams: { producto: productoId } });
  }

  closeModal(event: Event): void {
    // Cierra las ventanas modales si el clic no es dentro del formulario
    this.showLogin = false;
    this.showRegister = false;
     // Vuelve los accesos a su posición original
    document.querySelector('.access-container')?.classList.remove('move-down');
  }

  isChatbotVisible = false;

  toggleChatbot() {
    this.isChatbotVisible = !this.isChatbotVisible;
  }
}
