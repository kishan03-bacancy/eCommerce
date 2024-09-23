import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSidenav,
  MatSidenavContent,
  MatSidenavModule,
} from '@angular/material/sidenav';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { ThemeService } from '../../../shared/services/theme.service';
import { UserService } from '../../../shared/services/user.service';
import { Title } from '@angular/platform-browser';
import { AsyncPipe, Location, NgClass } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    HeaderComponent,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    NgClass,
    RouterOutlet,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  // vars
  navLinks: any[];
  isExpanded = true;

  isHandset$: Observable<boolean>;

  @ViewChild('drawer', { static: true }) public drawer!: MatSidenav;
  @ViewChild(MatSidenavContent) navContent!: MatSidenavContent;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public themeService: ThemeService,
    public userService: UserService,
    private titleService: Title
  ) {
    this.navLinks = [
      {
        link: '/dashboard',
        title: 'Dashboard',
        icon: 'dashboard_outline',
      },
      {
        link: '/categories',
        title: 'Categories',
        icon: 'category_outline',
      },
      {
        link: '/products',
        title: 'Products',
        icon: 'business_outline',
      },
    ];
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((result: BreakpointState) => result.matches));
    this.eventsOnRouteChange();
  }

  ngOnInit() {}

  eventsOnRouteChange() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.closeSidenav();
      }
      if (event instanceof NavigationEnd) {
        this.getDataForCurrentRoute(this.route);
        // TODO: scroll content to top on change of route
        // this.navContent.getElementRef().nativeElement.scrollTo({top: 0, behavior: 'smooth'});
      }
    });
  }

  getDataForCurrentRoute(child: ActivatedRoute) {
    if (child.firstChild) {
      this.getDataForCurrentRoute(child.firstChild);
    } else {
      const data = child.snapshot.data;
      if (data && data['title']) {
        this.titleService.setTitle(data['title']);
      }
    }
  }

  closeSidenav() {
    if (this.drawer.mode === 'over') {
      this.drawer.close();
    }
  }

  getSidenavClass() {
    if (this.drawer.mode === 'over') {
      this.isExpanded = true;
      return 'sidenav-mobile';
    } else if (!this.isExpanded) {
      return 'partial-collapsible';
    }
    return '';
  }
}
