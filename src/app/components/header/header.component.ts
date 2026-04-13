import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, 
  IonButton, IonIcon, IonPopover, IonContent, IonItem, IonInput, IonModal, IonLabel, IonList
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline, warningOutline, chevronDownOutline, chevronUpOutline, mailOutline, lockClosedOutline} from 'ionicons/icons';
import { DatabaseService } from '../../services/database'; // Ajusta la ruta
import { User } from '../../services/user'; // Ajusta la ruta
import { Toast } from 'src/app/services/toast';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, IonPopover, 
    IonContent, IonItem, IonInput, IonModal, IonLabel, IonList
  ]
})
export class HeaderComponent {
  @Input() title: string = '';

  isPopoverOpen = false;
  popoverEvent: any = null;
  passActual = ''; passNueva = ''; passConfirmar = '';
  mostrarConfirmar = false; tituloConfirmar = ''; mensajeConfirmar = ''; esBorrar = false;
  userEmail: string | null = '';
  isPasswordFieldsVisible = false;
  
  constructor(
    private router: Router, 
    private database: DatabaseService, 
    private userService: User,
    private Toast: Toast
  ) {
    addIcons({ personCircleOutline, logOutOutline, warningOutline, chevronDownOutline, chevronUpOutline, mailOutline, lockClosedOutline });
  }
  presentPopover(e: Event) {
    this.userEmail = localStorage.getItem('userEmail');
    this.isPasswordFieldsVisible = false;
    this.popoverEvent = e;
    this.isPopoverOpen = true;
  }

  togglePasswordMenu() {
    this.isPasswordFieldsVisible = !this.isPasswordFieldsVisible;
  }

  async updatePassword() {
  try {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.Toast.mostrarToast('Sesión no encontrada', 'error');
      return;
    }

    // 1. Validar que la contraseña actual sea la correcta
    const user = await this.database.validarUsuario(email, this.passActual);
    if (!user) {
      this.Toast.mostrarToast('La contraseña actual es incorrecta', 'error');
      return;
    }

    // 2. Validar coincidencia de la nueva
    if (this.passNueva.length < 4 || this.passNueva !== this.passConfirmar) {
      this.Toast.mostrarToast('Las contraseñas no coinciden o son muy cortas', 'warning');
      return;
    }

    // 3. Ejecutar actualización
    await this.database.actualizarPassword(email, this.passNueva);
    
    // Si llegamos aquí, todo salió bien
    this.Toast.mostrarToast('¡Contraseña actualizada con éxito!', 'success');
    this.limpiarCampos();
    
    setTimeout(() => {
      this.isPopoverOpen = false;
    }, 1500);

  } catch (error) {
    console.error('Error capturado:', error);
    this.Toast.mostrarToast('Error en la base de datos', 'error');
  }
}
  borrarCuenta() {
    this.esBorrar = true;
    this.tituloConfirmar = 'Borrar Cuenta';
    this.mensajeConfirmar = 'Se eliminarán tus datos permanentemente.';
    this.mostrarConfirmar = true;
  }

  async ejecutarAccion() {
    this.mostrarConfirmar = false;
    this.isPopoverOpen = false;
    const email = localStorage.getItem('userEmail');
    if (this.esBorrar && email) {
      try {
        // 1. Borrar de la base de datos SQLite
        await this.database.borrarUsuario(email);
        // 2. Limpieza de seguridad adicional para modo Web
        localStorage.removeItem(`user_${email}`); 
        localStorage.removeItem('userEmail');
        console.log('Cuenta eliminada con éxito');
      } catch (error) {
        console.error('Error al borrar cuenta:', error);
      }
    }
    // 3. Cerrar la sesión en el servicio de usuario y redirigir
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  private limpiarCampos() {
    this.passActual = ''; this.passNueva = ''; this.passConfirmar = '';
  }
}