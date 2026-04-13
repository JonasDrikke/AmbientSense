import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, 
  IonButton, IonIcon, IonPopover, IonContent, IonItem, IonInput, IonModal 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline, warningOutline } from 'ionicons/icons';
import { DatabaseService } from '../../services/database'; // Ajusta la ruta
import { User } from '../../services/user'; // Ajusta la ruta

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, IonPopover, 
    IonContent, IonItem, IonInput, IonModal
  ]
})
export class HeaderComponent {
  @Input() title: string = '';

  isPopoverOpen = false;
  popoverEvent: any = null;
  passActual = ''; passNueva = ''; passConfirmar = '';
  mostrarToast = false; mensajeToast = ''; tipoToast = '';
  mostrarConfirmar = false; tituloConfirmar = ''; mensajeConfirmar = ''; esBorrar = false;

  constructor(
    private router: Router, 
    private database: DatabaseService, 
    private userService: User
  ) {
    addIcons({ personCircleOutline, logOutOutline, warningOutline });
  }

  presentPopover(e: Event) {
    this.popoverEvent = e;
    this.isPopoverOpen = true;
  }

  async updatePassword() {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    // Usamos tu servicio de base de datos
    const user = await this.database.validarUsuario(email, this.passActual);
    
    if (!user) {
      this.lanzarToast('Contraseña actual incorrecta', 'error');
      return;
    }

    if (this.passNueva.length < 4 || this.passNueva !== this.passConfirmar) {
      this.lanzarToast('Las contraseñas no coinciden o son cortas', 'warning');
      return;
    }

    await this.database.actualizarPassword(email, this.passNueva);
    this.lanzarToast('¡Contraseña actualizada!', 'success');
    this.isPopoverOpen = false;
    this.limpiarCampos();
  }

  logout() {
    this.esBorrar = false;
    this.tituloConfirmar = 'Cerrar Sesión';
    this.mensajeConfirmar = '¿Quieres salir de AmbientSense?';
    this.mostrarConfirmar = true;
  }

  borrarCuenta() {
    this.esBorrar = true;
    this.tituloConfirmar = 'Borrar Cuenta';
    this.mensajeConfirmar = 'Se eliminarán tus datos permanentemente.';
    this.mostrarConfirmar = true;
  }

  async ejecutarAccion() {
    this.mostrarConfirmar = false;
    const email = localStorage.getItem('userEmail');

    if (this.esBorrar && email) {
      await this.database.borrarUsuario(email);
      localStorage.removeItem('userEmail');
    }
    
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  lanzarToast(mensaje: string, tipo: 'success' | 'error' | 'warning') {
    this.mensajeToast = mensaje;
    this.tipoToast = `toast-${tipo}`;
    this.mostrarToast = true;
    setTimeout(() => this.mostrarToast = false, 3000);
  }

  private limpiarCampos() {
    this.passActual = ''; this.passNueva = ''; this.passConfirmar = '';
  }
}