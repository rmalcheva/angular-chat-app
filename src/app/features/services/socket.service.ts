import { DestroyRef, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { OpenedConversationStateService } from './opened-conversation-state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor(
    private authService: AuthService,
    private destroyRef: DestroyRef,
    private openedConversationStateService: OpenedConversationStateService
  ) {
    const user = authService.getUserData();

    this.socket = io(environment.apiUrl, {
      query: {
        userId: user?.id,
      },
    });

    this.socket.on('newMessage', (message) => {
      this.openedConversationStateService.addNewMessage(message);
    });

    this.socket.on('connect', () => {
      console.log('connected to socket');
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected from socket');
    });

    this.authService.logout$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.disconnect();
    });
  }
  disconnect() {
    this.socket.disconnect();
  }
}
