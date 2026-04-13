// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class User {
  private isUserLoggedIn = false;
constructor() {
    // Revisar si había una sesión guardada al recargar la app
    this.isUserLoggedIn = localStorage.getItem('isLogged') === 'true';
  }

  login() {
    this.isUserLoggedIn = true;
    localStorage.setItem('isLogged', 'true');
  }

  logout() {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isLogged');
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
}