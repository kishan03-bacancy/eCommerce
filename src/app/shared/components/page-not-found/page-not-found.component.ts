import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';

@Component({
  standalone: true,
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  imports: [CommonModule, MatButtonModule, RouterModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  isThemeDark!: boolean;
  constructor(
    private themeService: ThemeService,
    private cdRef: ChangeDetectorRef
  ) {
    effect(() => {
      this.isThemeDark = this.themeService.themeSignal();
      this.cdRef.detectChanges();
    });
  }
}
