import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'chat-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  errorMessage: WritableSignal<string> = signal('');

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getUrlData();
  }

  signInWithGoogle() {
    window.location.href = environment.apiUrl + '/auth/google';
  }

  getUrlData() {
    this.route.queryParams.subscribe((params) => {
      const errorMessage: string = params['message'];
      if (errorMessage) {
        this.errorMessage.set(errorMessage);
      }
    });
  }
}
