import { Injectable } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le'
import { DatabaseService } from './database';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BleService {
SERVICE_UUID=         '12345678-1234-1234-1234-1234567890ab';
CHARACTERISTIC_UUID=  'abcd1234-5678-1234-5678-abcdef123456';

// Para el badge dinámico (Rojo/Verde)
  private connectedSubject = new BehaviorSubject<boolean>(false);
  public isConnected$ = this.connectedSubject.asObservable();

  // Para los datos de la gráfica
  private dataSubject = new Subject<{temp: number, hum: number}>();
  public data$ = this.dataSubject.asObservable();
  
  constructor(private db: DatabaseService) {}

async init(){
  await BleClient.initialize();
}

  async scan() {
    const devices: any[] = [];
    await BleClient.requestLEScan({ services: [this.SERVICE_UUID] }, (result) => {
      devices.push(result);
    });
    await new Promise(resolve => setTimeout(resolve, 5000));
    await BleClient.stopLEScan();
    return devices;
  }

 async connect(deviceId: string) {
    try {
      await BleClient.connect(deviceId, (id) => {
        console.log("🔌 Dispositivo desconectado:", id);
        this.connectedSubject.next(false); // Cambia a ROJO
      });

      this.connectedSubject.next(true); // Cambia a VERDE
      this.startBackgroundNotifications(deviceId);
    } catch (error) {
      this.connectedSubject.next(false);
      console.error("Error al conectar:", error);
    }
  }

  private async startBackgroundNotifications(deviceId: string) {
    await BleClient.startNotifications(
      deviceId,
      this.SERVICE_UUID,
      this.CHARACTERISTIC_UUID,
      async (value) => {
        const text = new TextDecoder().decode(value).trim();
        try {
          const data = JSON.parse(text);

          // INSERCIÓN EN DB (Se mantiene igual para ser continua)
          await this.db.guardarMedicion('temp', data.temp);
          await this.db.guardarMedicion('hum', data.hum);

          // NOTIFICACIÓN A LA UI
          this.dataSubject.next({ temp: data.temp, hum: data.hum });
          
        } catch (e) {
          console.error("❌ Error en datos:", text);
        }
      }
    );
  }

// Opcional: método para desconectar manualmente
async disconnect(deviceId: string) {
  await BleClient.disconnect(deviceId);
  this.connectedSubject.next(false);
}
}