import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { BleService } from '../../services/ble';
import { Chart } from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.page.html',
  styleUrls: ['./real-time.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent]
})
export class RealTimePage implements OnInit, OnDestroy {
  chart: any;
  currentTemp: number = 0;
  currentHum: number = 0;
  private dataSub!: Subscription;
  isConnected: boolean = false;
  private statusSub!: Subscription;

  constructor(private ble: BleService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.createChart();

    // Escuchar el estado de la conexión
    this.statusSub = this.ble.isConnected$.subscribe(status => {
      this.isConnected = status;
      this.cdr.detectChanges();
    });

    // Nos suscribimos al flujo de datos del servicio
    this.dataSub = this.ble.data$.subscribe(data => {
      this.currentTemp = data.temp;
      this.currentHum = data.hum;
      this.updateChart(data.temp, data.hum);
      this.cdr.detectChanges();
      
    });
  }

  createChart() {
    const canvas: any = document.getElementById('realTimeChart');
    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          { label: 'Temp °C', data: [], borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.2)', tension: 0.4 },
          { label: 'Hum %', data: [], borderColor: '#3880ff', backgroundColor: 'rgba(56, 128, 255, 0.2)', tension: 0.4 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } },
          x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
        }
      }
    });
  }

  updateChart(temp: number, hum: number) {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.chart.data.labels.push(now);
    this.chart.data.datasets[0].data.push(temp);
    this.chart.data.datasets[1].data.push(hum);

    if (this.chart.data.labels.length > 10) {
      this.chart.data.labels.shift();
      this.chart.data.datasets[0].data.shift();
      this.chart.data.datasets[1].data.shift();
    }
    this.chart.update();
  }

 ngOnDestroy() {
    if (this.dataSub) this.dataSub.unsubscribe();
    if (this.statusSub) this.statusSub.unsubscribe();
  }
}