import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-wrapper',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-wrapper.component.html',
  styleUrl: './auth-wrapper.component.scss',
})
export class AuthWrapperComponent {}
