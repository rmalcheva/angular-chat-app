import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Message } from '../../shared/models/message';
import { UserChat } from '../../shared/models/user-chat';
import { UserData } from '../../shared/models/user-data';
import { User } from '../../shared/models/user';
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

  setCurrentlyOpenedChat(user: User | null): void {
    this.currentlyOpenedChatSubject.next(user);
    console.log('setCurrentlyOpenedChat', user);
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
