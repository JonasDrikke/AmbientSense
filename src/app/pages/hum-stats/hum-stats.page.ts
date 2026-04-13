import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DatabaseService } from '../../services/database';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { addIcons } from 'ionicons';
import { waterOutline, snowOutline } from 'ionicons/icons';

@Component({
  selector: 'app-hum-stats',
  templateUrl: './hum-stats.page.html',
  styleUrls: ['./hum-stats.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent]
})
export class HumStatsPage implements OnInit {
  stats: any = null;

  constructor(private db: DatabaseService) {addIcons({ waterOutline, snowOutline });}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.cargarEstadisticas();
  }

  async cargarEstadisticas() {
    // Filtramos por 'hum'
    this.stats = await this.db.getStatsByType('hum');
  }
}