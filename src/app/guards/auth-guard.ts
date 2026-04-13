import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../services/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: User, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      return true; // Deja pasar al usuario
    } else {
      this.router.navigate(['/login']); // Lo manda al login si no hay sesión
      return false;
    }
  }
}
