import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // var
  appName = 'Application! 👋🏻';
  loginString = 'Please sign-in to your account and start the adventure';
  isLogin = true;
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  user!: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setLoginFormControl();
  }

  get controls() {
    return this.loginForm.controls;
  }

  setLoginFormControl() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService
        .login(this.loginForm.value)
        .pipe(tap(() => (this.isLoading = false)))
        .subscribe();
    }
  }

  resetForms() {
    this.loginForm.reset();
  }
}
