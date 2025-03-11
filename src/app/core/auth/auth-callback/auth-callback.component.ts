import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../../../shared/models/user-data';
import { RoutesPaths } from '../../../shared/models/routes';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'chat-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss',
})
export default class AuthCallbackComponent {
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getDataFromUrl();
  }

  getDataFromUrl() {
    this.route.queryParams.subscribe((params) => {
      const userData: string = params['userData'];

      if (userData) {
        const parsedUserData: UserData = JSON.parse(userData);
        this.authService.setUserSession(parsedUserData, RoutesPaths.CHAT);
      } else {
        this.router.navigate([RoutesPaths.LOGIN], {
          queryParams: { error: 'Authentication failed. Please try again.' },
        });
      }
    });
  }
}
