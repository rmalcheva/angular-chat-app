import { Component, HostBinding, HostListener, input, OnInit } from '@angular/core';
import { UserChat } from '../../../shared/models/user-chat';
import { CommonModule } from '@angular/common';
import { MessagesApiService } from '../../services/messages-api.service';
import { Message } from '../../../shared/models/message';
import { OpenedConversationStateService } from '../../services/opened-conversation-state.service';
import { TimeAgoPipe } from '../../../shared/time-ago.pipe';
import { User } from '../../../shared/models/user';
import { Observable } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'chat-user-list-item',
  imports: [CommonModule, TimeAgoPipe],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.scss',
})
export class UserListItemComponent implements OnInit {
  chat = input<UserChat | null>(null);
  currentlyOpenedChat$!: Observable<User | null>;

  constructor(
    private messagesApiService: MessagesApiService,
    // private toaster: ToastrService,
    private openedConversationStateService: OpenedConversationStateService
  ) {}

  ngOnInit() {
    this.currentlyOpenedChat$ = this.openedConversationStateService.getCurrentlyOpenedChat();
  }

  @HostListener('click')
  getChatMessages() {
    const userIdToGetMsgsFrom = this.chat()?.userData.id;
    this.openedConversationStateService.setCurrentlyOpenedChat(this.chat()!.userData);
    this.messagesApiService.getMessagesFromUser(userIdToGetMsgsFrom!).subscribe({
      next: (messages: Message[]) => {
        this.openedConversationStateService.sendChatMessages(messages);
      },
      error: (error) => {
        this.openedConversationStateService.sendErrorChatMessages(error);
        // this.toaster.error('Съобщенията в чата не могат да бъдат заредени');
      },
    });
  }
}
