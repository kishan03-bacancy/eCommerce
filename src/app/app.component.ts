import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { svgIcons } from './shared/constants/svg-icons.data';
import { SVGIcon } from './shared/models/svg-icon.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'eCommerce';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.registerSVGIcons();
  }

  // register all icons
  registerSVGIcons() {
    svgIcons.forEach((icon: SVGIcon) => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${icon.fileName}`
        )
      );
    });
  }
}
