import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { OpenConversationComponent } from '../open-conversation/open-conversation.component';
import { AuthService } from '../../../core/services/auth.service';
import { SocketService } from '../../services/socket.service';
import { OpenedConversationStateService } from '../../services/opened-conversation-state.service';

@Component({
  selector: 'chat-container',
  imports: [UserListComponent, OpenConversationComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export default class ChatComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private socket: SocketService,

    private openedConversationStateService: OpenedConversationStateService
  ) {}

  ngOnInit() {
    if (!this.socket.isSocketAlreadyInitialized()) {
      this.socket.initializeSocket(this.authService.getUserData()!.id);
    }
    this.openedConversationStateService.listenSocketForNewMessage();
  }

  logout() {
    this.authService.logout();
  }
}
