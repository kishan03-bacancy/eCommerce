import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  checked = false;
  constructor(private themeService: ThemeService) {
    this.checked = this.themeService.themeSignal();
  }

  toggle(event: MatSlideToggleChange) {
    this.checked = event.checked;
    this.themeService.toggleTheme(this.checked);
  }
}
