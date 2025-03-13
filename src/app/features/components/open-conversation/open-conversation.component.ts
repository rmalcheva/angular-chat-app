import { Component, DestroyRef, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { OpenedConversationStateService } from '../../services/opened-conversation-state.service';
import { Message } from '../../../shared/models/message';
import { MessageComponent } from '../message/message.component';
import { FormsModule } from '@angular/forms';
import { MessagesApiService } from '../../services/messages-api.service';
import { User } from '../../../shared/models/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'chat-open-conversation',
  imports: [MessageComponent, FormsModule],
  templateUrl: './open-conversation.component.html',
  styleUrl: './open-conversation.component.scss',
})
export class OpenConversationComponent implements OnInit {
  messages: WritableSignal<Message[] | null> = signal([]);
  newMessage: string = '';
  userIdChat: string = '';
  constructor(
    private openedConversationStateService: OpenedConversationStateService,
    private messagesApiService: MessagesApiService,
    private destroyRef: DestroyRef // private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getChatMessages();
    this.getOpenedChat();
  }

  getChatMessages() {
    this.openedConversationStateService
      .getChatMessages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (messages: Message[] | null) => this.messages.set(messages),
      });
  }

  getOpenedChat() {
    this.openedConversationStateService
      .getCurrentlyOpenedChat()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User | null) => {
          this.userIdChat = user?.id!;
        },
      });
  }

  sendMessage() {
    this.messagesApiService.sendMessageToUser(this.userIdChat, this.newMessage.trim()).subscribe({
      next: () => null,
      // error: () => this.toastr.error('Съобщението не може да се изпрати'),
    });
    this.newMessage = '';
  }

  isSendButtonDisabled() {
    return !this.newMessage.trim();
  }
}
