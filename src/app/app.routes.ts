import { Routes } from '@angular/router';
import { RoutesPaths } from './shared/models/routes';
import { authGuard } from './core/guards/auth.guard';
import AuthCallbackComponent from './core/auth/auth-callback/auth-callback.component';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: RoutesPaths.LOGIN, pathMatch: 'full' },
  {
    path: RoutesPaths.LOGIN,
    loadComponent: () => import('./core/auth/login/login.component'),
    canActivate: [loginGuard],
  },
  {
    path: RoutesPaths.CHAT,
    loadComponent: () => import('./features/components/chat/chat.component'),
    canActivate: [authGuard],
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./core/auth/auth-callback/auth-callback.component'),
  },

  //can add page not found if there is time
  { path: '**', redirectTo: RoutesPaths.LOGIN },
];
