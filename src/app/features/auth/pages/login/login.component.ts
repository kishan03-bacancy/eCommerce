import { Component } from '@angular/core';
import { MaterialModule } from '../../../../shared/dependencies/material.module';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterModule],
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
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService
        .mockLogin(this.loginForm.value)
        .pipe(tap(() => (this.isLoading = false)))
        .subscribe();
    }
  }

  resetForms() {
    this.loginForm.reset();
  }
}
