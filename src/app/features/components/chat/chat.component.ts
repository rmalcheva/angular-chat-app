import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { OpenConversationComponent } from '../open-conversation/open-conversation.component';
import { AuthService } from '../../../core/services/auth.service';
import { SocketService } from '../../services/socket.service';
import { OpenedConversationStateService } from '../../services/opened-conversation-state.service';
import { UserProfileQuickViewComponent } from '../user-profile-quick-view/user-profile-quick-view.component';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'chat-container',
  imports: [UserListComponent, OpenConversationComponent, UserProfileQuickViewComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export default class ChatComponent implements OnInit {
  user!: User;
  constructor(
    private authService: AuthService,
    private socket: SocketService,

    private openedConversationStateService: OpenedConversationStateService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUserData()!;
    if (!this.socket.isSocketAlreadyInitialized()) {
      this.socket.initializeSocket(this.user!.id);
    }
    this.openedConversationStateService.listenSocketForNewMessage();
  }
}
