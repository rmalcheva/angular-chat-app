import { Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { UserData } from '../../shared/models/user-data';
import { LoginRequest } from '../models/login';
import { Router } from '@angular/router';
import { RoutesPaths } from '../../shared/models/routes';
import { StorageService } from '../../shared/services/storage.service';
import { LocalStorageKey } from '../../shared/models/local-storage-key';
import { User } from '../../shared/models/user';
import { SocketService } from '../../features/services/socket.service';
import { Subject } from 'rxjs';
import { OpenedConversationStateService } from '../../features/services/opened-conversation-state.service';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logoutSubject = new Subject<void>();
  logout$ = this.logoutSubject.asObservable();

  constructor(
    private authApiService: AuthApiService,
    // private toastr: ToastrService,
    private router: Router,
    private storageService: StorageService,
    private openedConversationStateService: OpenedConversationStateService
  ) {}

  login(email: string, password: string): void {
    const userData: LoginRequest = { email, password };
    this.authApiService.login(userData).subscribe({
      next: (response: UserData) => {
        this.setUserSession(response, RoutesPaths.CHAT);
      },
      error: (error) => {
        // this.toastr.error('Грешка при логване');
      },
    });
  }

  logout(): void {
    this.authApiService.logout().subscribe({
      next: () => {
        this.clearSession();
      },
      error: (error) => {
        // this.toastr.error('Грешка при логаут');
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

  getUserData(): User | null {
    const userData = this.storageService.get(LocalStorageKey.USER);
    return userData ? JSON.parse(userData) : null;
  }

  saveUserData(response: UserData): void {
    this.storageService.set(LocalStorageKey.AUTH_TOKEN, response.token);
    this.storageService.set(LocalStorageKey.USER, JSON.stringify(response.user));
  }

  setUserSession(userData: UserData, navigateToUrl: string) {
    this.saveUserData(userData);
    this.router.navigate([navigateToUrl]);
  }

  clearSession() {
    this.storageService.clear();
    this.logoutSubject.next();
    this.router.navigateByUrl(RoutesPaths.LOGIN);
    this.openedConversationStateService.sendLastSentMessage(null);
    this.openedConversationStateService.sendChatMessages([]);
    this.openedConversationStateService.setCurrentlyOpenedChat(null);
  }
}
