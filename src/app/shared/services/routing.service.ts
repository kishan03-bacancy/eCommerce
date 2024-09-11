import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private router: Router, private location: Location) {}

  // redirect to home page
  redirectToHome() {
    this.router.navigate(['/dashboard']);
  }

  // redirect to login
  redirectToAuth() {
    this.router.navigate(['/login']);
  }

  // redirect to page-not-found
  redirectToPageNotFound() {
    this.router.navigate(['404']);
  }

  // redirect to specific path
  redirectToPath(path: string, queryParams: any = null) {
    if (queryParams) {
      const navigationExtras: NavigationExtras = {
        queryParams,
      };
      this.router.navigate([path], navigationExtras);
    } else {
      this.router.navigate([path]);
    }
  }

  goBack() {
    this.location.back();
  }

  // open url in new tab
  openURLInNewTab(url: string) {
    window.open(url, '_blank');
  }
}
