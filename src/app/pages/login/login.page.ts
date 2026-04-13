import { Component, OnInit } from '@angular/core'; // Agregué OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonInput, IonButton, IonList, IonIcon, 
  IonButtons, IonText, IonCheckbox, MenuController 
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

// IMPORTANTE: Asegúrate de que las rutas de estos archivos sean correctas
import { User } from 'src/app/services/user'; 
import { DatabaseService } from 'src/app/services/database';
import { Toast } from 'src/app/services/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonModal, IonHeader, IonToolbar, 
    IonTitle, IonContent, IonItem, IonInput, IonButton, 
    IonList, IonIcon, IonButtons, IonText, IonCheckbox,
  ],
})
export class LoginPage implements OnInit {
  usuario = {
    email: '',
    password: '',
    aceptaTerminos: false
  };

  esRegistro = true;
  tipoPassword = 'password';
  mostrarToast = false;
  mensajeToast = '';
  tipoToast = '';
  mostrarTerminos = false;

  // CONSTRUCTOR CORREGIDO
  constructor(
    private menuCtrl: MenuController, 
    private router: Router, 
    private userService: User, // Inyectamos el servicio de sesión
    private database: DatabaseService, // Inyectamos la base de datos
    private Toast: Toast
  ) {
    addIcons({ mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'main-menu');
    // Si ya está logueado, mandarlo directo al scan
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/scan']);
    }
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'main-menu');
  }

  async onSubmit(formulario: any) {
    if (formulario.invalid) return;

    if (this.esRegistro) {
      try {
        await this.database.registrarUsuario(this.usuario.email, this.usuario.password);
        this.Toast.mostrarToast('¡Registro exitoso! Ya puedes iniciar sesión', 'success');
        this.cambiarModo();
      } catch (e) {
        this.Toast.mostrarToast('Error: El correo ya existe o error en BD', 'error');
        console.error(e);
      }
    } else {
      try {
        const user = await this.database.validarUsuario(this.usuario.email, this.usuario.password);
        if (user) {
          localStorage.setItem('userEmail', this.usuario.email);
          this.userService.login(); // Marcamos la sesión como activa
          this.Toast.mostrarToast(`Bienvenido`, 'success');
          this.router.navigate(['/scan']); // Navegamos a la página de dispositivos
        } else {
          this.Toast.mostrarToast('Correo o contraseña incorrectos', 'error');
        }
      } catch (e) {
        this.Toast.mostrarToast('Error al conectar con la base de datos', 'error');
      }
    }
  }

  // MÉTODOS DE APOYO
  cambiarModo() {
    this.esRegistro = !this.esRegistro;
    this.usuario = { email: '', password: '', aceptaTerminos: false };
  }

  togglePasswordMode() {
    this.tipoPassword = this.tipoPassword === 'password' ? 'text' : 'password';
  }
}