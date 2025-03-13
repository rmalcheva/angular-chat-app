import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { OpenConversationComponent } from '../open-conversation/open-conversation.component';
import { AuthService } from '../../../core/services/auth.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'chat-container',
  imports: [UserListComponent, OpenConversationComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export default class ChatComponent {
  constructor(private authService: AuthService, private socketService: SocketService) {}
  logout() {
    this.authService.logout();
  }
}
