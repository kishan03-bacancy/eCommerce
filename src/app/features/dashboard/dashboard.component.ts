import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { ThemeService } from '../../shared/services/theme.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  checked = false;
  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.checked = this.themeService.themeSignal();
  }

  toggle(event: Event) {
    this.checked = !this.checked;
    this.themeService.toggleTheme(this.checked);
  }

  logout() {
    this.authService.logout();
  }
}
