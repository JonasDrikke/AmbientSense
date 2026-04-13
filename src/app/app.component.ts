import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { 
  IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, 
  IonTitle, IonContent, IonList, IonItem, IonLabel, 
  IonMenuToggle, IonIcon, IonListHeader, IonModal, IonButton 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  bluetoothOutline, pulseOutline, thermometerOutline, 
  waterOutline, barChartOutline, statsChartOutline, logOutOutline, warningOutline } from 'ionicons/icons';
import { User } from './services/user'; // Asegúrate de que la ruta sea correcta
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, 
    IonTitle, IonContent, IonList, IonItem, IonLabel, 
    IonMenuToggle, IonIcon, IonListHeader, IonButton, IonModal, RouterLink
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  mostrarConfirmar = false;
  tituloConfirmar = '';
  mensajeConfirmar = '';

  constructor(public userService: User, private router: Router) {
    // Registramos los iconos para que se vean en el menú
    addIcons({bluetoothOutline,pulseOutline,thermometerOutline,barChartOutline,waterOutline,statsChartOutline,logOutOutline,warningOutline});
  }

  logout() {
    this.tituloConfirmar = 'Cerrar Sesión';
    this.mensajeConfirmar = '¿Quieres salir de AmbientSense?';
    this.mostrarConfirmar = true;
  }
  ejecutarAccion() {
    this.mostrarConfirmar = false;
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}