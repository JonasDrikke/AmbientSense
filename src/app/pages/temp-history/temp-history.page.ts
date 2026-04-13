import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-temp-history',
  templateUrl: './temp-history.page.html',
  styleUrls: ['./temp-history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent]
})
export class TempHistoryPage implements OnInit {
  registros: any[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.cargarHistorial();
  }

  async cargarHistorial() {
    // Usamos el método que acabamos de corregir en el servicio
    this.registros = await this.db.getHistoryByType('temp');
  }

  // Función para dar color dinámico según la temperatura
  getTempColor(temp: number) {
    if (temp >= 30) return 'danger';
    if (temp >= 24) return 'warning';
    return 'success';
  }
}