import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { DatabaseService } from './app/services/database';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader'; // Importa el cargador
import { Capacitor } from '@capacitor/core';

if (Capacitor.getPlatform() === 'web') {
  jeepSqlite(window);
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
}).then(appRef => {
  // Inicializamos la base de datos justo después del bootstrap
  const dbService = appRef.injector.get(DatabaseService);
  dbService.inicializarLogica();
});