import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DatabaseService } from '../../services/database';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { addIcons } from 'ionicons';
import { arrowUpOutline, arrowDownOutline } from 'ionicons/icons';

@Component({
  selector: 'app-temp-stats',
  templateUrl: './temp-stats.page.html',
  styleUrls: ['./temp-stats.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent]
})
export class TempStatsPage implements OnInit {
  stats: any = null;

  constructor(private db: DatabaseService) {addIcons({ arrowUpOutline, arrowDownOutline });}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.cargarEstadisticas();
  }

  async cargarEstadisticas() {
    // Filtramos por 'temp' tal como está definido en tu DB
    this.stats = await this.db.getStatsByType('temp');
  }
}