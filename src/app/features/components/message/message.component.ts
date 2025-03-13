import { Component, computed, input, linkedSignal, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Message } from '../../../shared/models/message';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../../shared/time-ago.pipe';

@Component({
  selector: 'chat-message',
  imports: [CommonModule, TimeAgoPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent implements OnInit {
  message = input<Message>();
  messageSender: Signal<User | null> = signal(null);
  shouldDisplayMsg: WritableSignal<boolean> = signal(false);
  displayOnRight: WritableSignal<boolean> = signal(false);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.handleIncominMessage();
  }

  handleIncominMessage() {
    const loggedInUser = this.authService.getUserData();
    this.setChatPosition(loggedInUser!);
    this.messageSender = computed(() => {
      return this.message()?.senderId!;
    });
  }

  setChatPosition(loggedInUser: User) {
    if (this.message()?.senderId.id === loggedInUser?.id) {
      this.displayOnRight.set(true);
    } else {
      this.displayOnRight.set(false);
    }
  }
}
