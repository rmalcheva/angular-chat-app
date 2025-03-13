import { Component, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'chat-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  errorMessage: WritableSignal<string> = signal('');
  loginForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    //  private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUrlData();
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
    }
  }

  signInWithGoogle() {
    window.location.href = environment.apiUrl + '/auth/google';
  }

  getUrlData() {
    this.route.queryParams.subscribe((params) => {
      const errorMessage: string = params['message'];
      if (errorMessage) {
        // this.toastr.error(errorMessage);
      }
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
