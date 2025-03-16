import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Message } from '../../shared/models/message';
import { User } from '../../shared/models/user';
import { SocketService } from './socket.service';
@Injectable({
  providedIn: 'root',
})
export class OpenedConversationStateService {
  currentlyOpenedChatSubject = new BehaviorSubject<User | null>(null);
  currentlyOpenedChat$ = this.currentlyOpenedChatSubject.asObservable();

  lastSentMessageSubject = new Subject<Message | null>();
  lastSentMessage$ = this.lastSentMessageSubject.asObservable();

  chatMessagesSubject = new BehaviorSubject<Message[] | null>([]);
  chatMessages$ = this.chatMessagesSubject.asObservable();

  constructor(private socket: SocketService) {}

  setCurrentlyOpenedChat(user: User | null): void {
    this.currentlyOpenedChatSubject.next(user);
  }

  getCurrentlyOpenedChat() {
    return this.currentlyOpenedChat$;
  }

  sendLastSentMessage(message: Message | null) {
    this.lastSentMessageSubject.next(message);
  }

  getLastSendMessage(): Observable<Message | null> {
    return this.lastSentMessage$;
  }

  sendChatMessages(messages: Message[] | null) {
    this.chatMessagesSubject.next(messages);
  }

  getChatMessages() {
    return this.chatMessagesSubject;
  }

  sendErrorChatMessages(error: any) {
    this.chatMessagesSubject.error(error);
  }

  listenSocketForNewMessage() {
    this.socket.on('newMessage', (message) => {
      this.addNewMessage(message);
    });
  }

  addNewMessage(message: Message) {
    if (this.isNewMessageFromOpenedChat(message)) {
      const currentMessages = this.chatMessagesSubject.getValue();
      const updatedMessages = currentMessages ? [...currentMessages, message] : [message];
      this.sendChatMessages(updatedMessages);
    }
    this.sendLastSentMessage(message);
  }

  isNewMessageFromOpenedChat(message: Message) {
    const getCurrentlyOpenedChatValue = this.currentlyOpenedChatSubject.value;
    return getCurrentlyOpenedChatValue?.id === message.senderId.id || getCurrentlyOpenedChatValue?.id === message.receiverId;
  }
}
