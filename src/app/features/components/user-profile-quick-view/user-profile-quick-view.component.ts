import { Component, input } from '@angular/core';
import { UserData } from '../../../shared/models/user-data';
import { User } from '../../../shared/models/user';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'chat-user-profile-quick-view',
  imports: [],
  templateUrl: './user-profile-quick-view.component.html',
  styleUrl: './user-profile-quick-view.component.scss',
})
export class UserProfileQuickViewComponent {
  user = input<User>();

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
