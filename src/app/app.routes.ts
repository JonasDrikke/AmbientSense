import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
 {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
  },
  {
    path: 'scan',
    loadComponent: () => import('./pages/scan/scan.page').then( m => m.ScanPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'real-time',
    loadComponent: () => import('./pages/real-time/real-time.page').then( m => m.RealTimePage),
    canActivate: [AuthGuard],
  },
  {
    path: 'temp-history',
    loadComponent: () => import('./pages/temp-history/temp-history.page').then( m => m.TempHistoryPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'hum-history',
    loadComponent: () => import('./pages/hum-history/hum-history.page').then( m => m.HumHistoryPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'temp-stats',
    loadComponent: () => import('./pages/temp-stats/temp-stats.page').then( m => m.TempStatsPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'hum-stats',
    loadComponent: () => import('./pages/hum-stats/hum-stats.page').then( m => m.HumStatsPage),
    canActivate: [AuthGuard],
  },
];
