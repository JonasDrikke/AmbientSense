import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-hum-history',
  templateUrl: './hum-history.page.html',
  styleUrls: ['./hum-history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent]
})
export class HumHistoryPage implements OnInit {
  registros: any[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.cargarHistorial();
  }

  async cargarHistorial() {
    // Usamos el método que acabamos de corregir en el servicio
    this.registros = await this.db.getHistoryByType('hum');
  }

  // Función para dar color dinámico según la humedad
getHumColor(hum: number) {
  if (hum > 70) return 'primary'; // Humedad alta (Muy húmedo)
  if (hum >= 40) return 'success'; // Rango ideal (Confortable)
  if (hum < 30) return 'warning';  // Humedad baja (Seco)
  return 'medium';
}
}