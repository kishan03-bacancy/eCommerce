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
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, MatCheckboxModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  // var
  signupForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  user!: any;
  termsControl = new FormControl<boolean>(false);
  formSubmitted = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setSignupFormControl();
  }

  get controls() {
    return this.signupForm.controls;
  }

  setSignupFormControl() {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      role: new FormControl(3),
    });
  }

  signup() {
    this.formSubmitted = true;
    if (this.signupForm.valid && this.termsControl.value) {
      this.isLoading = true;
      this.authService
        .register(this.signupForm.value)
        .pipe(
          tap(() => (this.isLoading = false)),
          tap(() => (this.formSubmitted = false))
        )
        .subscribe();
    }
  }

  googleSignIn() {
    this.authService.registerWithGoogle();
  }

  resetForms() {
    this.signupForm.reset();
  }
}
