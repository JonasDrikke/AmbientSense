import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BleService } from '../../services/ble';
import { DatabaseService } from '../../services/database';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { addIcons } from 'ionicons';
import { bluetoothOutline, searchOutline, checkmarkCircle, radioButtonOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent]
})
export class ScanPage {
  devices: any[] = [];
  selectedDeviceId: string = '';

  constructor(private ble: BleService, private db: DatabaseService) {
    addIcons({ bluetoothOutline, searchOutline, checkmarkCircle, radioButtonOffOutline });
  }

  async ionViewDidEnter() {
    await this.ble.init();
  }

  async scan() {
    this.devices = await this.ble.scan();
  }

  async connect(device: any) {
    const deviceId = device.device?.deviceId || device.deviceId;
    
    try {
      console.log("Intentando conectar a:", deviceId);
      await this.ble.connect(deviceId);
      this.selectedDeviceId = deviceId;
      
      // Una vez conectado, podrías redirigir automáticamente a tiempo real
      // this.router.navigate(['/real-time']);
      
    } catch (error) {
      console.error("❌ Error de conexión:", error);
    }
  }

  isSelected(device: any): boolean {
    const id = device.device?.deviceId || device.deviceId;
    return id === this.selectedDeviceId;
  }
}