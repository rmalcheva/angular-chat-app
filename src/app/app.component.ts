import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './features/services/socket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}
  title = 'chat-app';
}
