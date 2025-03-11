import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { RoutesPaths } from '../../shared/models/routes';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    router.navigateByUrl(RoutesPaths.CHAT);
    return false;
  }
  return true;
};
