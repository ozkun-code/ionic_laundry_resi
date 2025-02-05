import { Routes } from '@angular/router';
import { autoLoginGuard } from './guards/auto-login.guard';
import { introGuard } from './guards/intro.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',

    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [introGuard, autoLoginGuard], // Check if we should show the introduction or forward to inside
  },
  {
    path: 'intro',
    loadComponent: () =>
      import('./pages/intro/intro.page').then((m) => m.IntroPage),
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: 'resi',
    loadComponent: () => import('./resi/resi.page').then((m) => m.ResiPage),
  },
  {
    path: 'claim-voucher',
    loadComponent: () =>
      import('./claim-voucher/claim-voucher.page').then(
        (m) => m.ClaimVoucherPage
      ),
  },
];
