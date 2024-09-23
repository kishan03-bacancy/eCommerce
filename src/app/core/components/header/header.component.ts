import {
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { ThemeService } from '../../../shared/services/theme.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import {
  SnackBarService,
  SnackBarType,
} from '../../../shared/services/snack-bar.service';
import { RoutingService } from '../../../shared/services/routing.service';
import { AuthService } from '../../../features/auth/services/auth.service';
import { ImageComponent } from '../../../shared/components/image/image.component';
import { Store } from '@ngrx/store';
import { cartCount } from '../../../features/cart/store/cart.selector';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ImageComponent,
    MatBadgeModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // vars
  isThemeDark!: boolean;
  user!: any;
  themeToggleButton: any = { text: 'Light Theme', icon: 'light_mode' };

  cartCount: number | string = 0;

  @Input() isHandset!: boolean | null;
  @Output() clicked = new EventEmitter<boolean>();

  cartUrl!: Signal<any>;

  constructor(
    private themeService: ThemeService,
    private localStorageService: LocalStorageService,
    private snackBarService: SnackBarService,
    private routingService: RoutingService,
    private authService: AuthService,
    private store$: Store,
    private router: Router
  ) {
    this.initThemeProperties();
    this.cartUrl = toSignal(
      this.router.events.pipe(
        filter((ev) => ev instanceof NavigationEnd),
        map((ev) => ev.urlAfterRedirects)
      )
    );
    effect(() => {
      const count = this.store$.selectSignal(cartCount)();
      this.cartCount = count > 9 ? '9+' : count;
    });
  }

  ngOnInit() {
    this.user = this.localStorageService.getItem('USER_DATA');
  }

  initThemeProperties() {
    effect(() => {
      this.isThemeDark = this.themeService.themeSignal();
      this.themeToggleButton.text =
        (this.isThemeDark ? 'Light' : 'Dark') + 'Theme';
      this.themeToggleButton.icon = this.isThemeDark
        ? 'light_mode'
        : 'dark_mode';
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme(!this.isThemeDark);
  }

  toggle() {
    this.clicked.emit(true);
  }

  logout() {
    this.user = null;
    this.authService.logout();
    this.routingService.redirectToAuth();
    this.snackBarService.openSnackBar(
      'Logged Out Successfully!',
      '',
      SnackBarType.SUCCESS
    );
  }
}
