import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserApiService } from '../../services/user-api.service';
import { User } from '../../../shared/models/user';
import { OpenedConversationStateService } from '../../services/opened-conversation-state.service';
import { UserChat } from '../../../shared/models/user-chat';
import { AuthService } from '../../../core/services/auth.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'chat-start-new-chat',
  imports: [FormsModule],
  templateUrl: './start-new-chat.component.html',
  styleUrl: './start-new-chat.component.scss',
})
export class StartNewChatComponent {
  options: WritableSignal<{ value: User; label: string }[]> = signal([]);
  selectedUser: string = '';

  constructor(private authService: AuthService, private usersApiService: UserApiService) //  private toastr: ToastrService
  {}

  ngOnInit() {
    this.fetchOptions();
    console.log(this.selectedUser);
  }

  fetchOptions() {
    this.usersApiService.getAllRegisteredUsers().subscribe({
      next: (users: User[]) => {
        console.log(users);

        this.options.set(
          users.map((user) => {
            return { value: user, label: user.name };
          })
        );
      },
      error: (error) => {
        // this.toastr.error('Регистрираните потребители не могат да се извлекат');
      },
    });
  }

  onSelectUser() {
    // const loggedInUser = this.authService.getUserData();
    // console.log('Selected value:', this.selectedUser);
    // this.openedConversationStateService.setCurrentlyOpenedChat(loggedInUser!);
  }
}
