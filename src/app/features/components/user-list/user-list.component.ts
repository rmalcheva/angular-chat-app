import { Component, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { UserChat } from '../../../shared/models/user-chat';
import { UserListItemComponent } from '../user-list-item/user-list-item.component';
import { OpenedConversationStateService } from '../../services/opened-conversation-state.service';
import { Message } from '../../../shared/models/message';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'chat-user-list',
  imports: [UserListItemComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  chats: WritableSignal<UserChat[]> = signal([]);
  constructor(
    private userApiService: UserApiService,
    private destroyRef: DestroyRef,
    private openedConversationStateService: OpenedConversationStateService // private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getStartedChatsWithUsers();
    this.getLastSentMessage();
  }

  getStartedChatsWithUsers() {
    this.userApiService.getStartedChatsWithUsers().subscribe({
      next: (response: UserChat[]) => {
        this.chats.set(response);
      },
      error: (err) => {
        // this.toastr.error('Чатовете не могат да бъдат заредени');
      },
    });
  }

  getLastSentMessage() {
    this.openedConversationStateService
      .getLastSendMessage()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (lastMessage: Message | null) => {
          this.updateChatLastMsg(lastMessage);
        },
      });
  }

  updateChatLastMsg(lastMessage: Message | null) {
    const chatWithLastMsg = this.findWhichChatHasReceivedLastMessage(lastMessage);
    if (chatWithLastMsg && lastMessage) {
      this.chats.set(
        this.chats().map((chat: UserChat) => {
          return chat.userData.id === chatWithLastMsg.userData.id ? { ...chat, lastMessage: lastMessage.message } : chat;
        })
      );
    }
  }

  findWhichChatHasReceivedLastMessage(message: Message | null) {
    if (message) {
      return this.chats().find((chat) => chat.userData.id === message.senderId.id || chat.userData.id === message.receiverId);
    }
    return null;
  }
}
