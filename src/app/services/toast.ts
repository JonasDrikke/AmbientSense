import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root' // Esto lo hace disponible en toda la app
})
export class Toast {

  constructor(private toastController: ToastController) {}

  async mostrarToast(mensaje: string, tipo: 'success' | 'error' | 'warning' = 'success') {
    const colores = {
      success: 'success', // Verde esmeralda de tu tema
      error: 'danger',    // Rojo para errores
      warning: 'warning'  // Naranja para advertencias
    };

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'top', 
      color: colores[tipo],
      cssClass: 'ambient-toast' // Clase para tu CSS global
    });

    await toast.present();
  }
}