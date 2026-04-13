import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-hum-stats',
  templateUrl: './hum-stats.page.html',
  styleUrls: ['./hum-stats.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HumStatsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
