import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-temp-stats',
  templateUrl: './temp-stats.page.html',
  styleUrls: ['./temp-stats.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TempStatsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
