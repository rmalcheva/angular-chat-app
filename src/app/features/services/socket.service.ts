import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private isInitialized = false;

  constructor() {}

  initializeSocket(userId: string) {
    this.socket = io(environment.apiUrl, {
      reconnection: true,
      autoConnect: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      query: {
        userId,
      },
    });

    this.socket.on('connect', () => {
      console.log('connected to socket');
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected from socket');
    });

    this.socket.on('reconnect', () => {
      console.log(`Reconnected`);
    });
    this.isInitialized = true;
  }

  isSocketAlreadyInitialized() {
    return this.isInitialized;
  }

  on(eventName: string, callback: (data: any) => void) {
    this.socket.on(eventName, callback);
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
    this.isInitialized = false;
  }
}
