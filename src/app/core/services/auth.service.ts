import { Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { UserData } from '../../shared/models/user-data';
import { LoginRequest } from '../models/login';
import { Router } from '@angular/router';
import { RoutesPaths } from '../../shared/models/routes';
import { StorageService } from '../../shared/services/storage.service';
import { LocalStorageKey } from '../../shared/models/local-storage-key';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authApiService: AuthApiService, private router: Router, private storageService: StorageService) {}

  login(email: string, password: string): void {
    const userData: LoginRequest = { email, password };
    this.authApiService.login(userData).subscribe({
      next: (response: UserData) => {
        this.setUserSession(response, RoutesPaths.CHAT);
      },
      error: (error) => {
        //display dialog
        console.log(error);
      },
    });
  }

  logout(): void {
    this.authApiService.logout().subscribe({
      next: () => {
        this.clearSession();
      },
      error: (error) => {
        //show dialog
        console.error('Logout failed:', error);
      },
    });
  }

  isAuthenticated(): boolean {
    const token = this.storageService.get(LocalStorageKey.AUTH_TOKEN);
    return !!token;
  }

  getToken(): string | null {
    const token = this.storageService.get(LocalStorageKey.AUTH_TOKEN);
    return token;
  }

  saveUserData(response: UserData): void {
    this.storageService.set(LocalStorageKey.AUTH_TOKEN, JSON.stringify(response.token));
    this.storageService.set(LocalStorageKey.USER, JSON.stringify(response.user));
  }

  setUserSession(userData: UserData, navigateToUrl: string) {
    this.saveUserData(userData);
    this.router.navigate([navigateToUrl]);
  }

  clearSession() {
    this.storageService.clear();
    this.router.navigateByUrl(RoutesPaths.LOGIN);
  }
}
