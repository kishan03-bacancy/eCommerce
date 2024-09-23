import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  @Input() src?: string;
  @Input() alt?: string;
  @Input() classNames?: string;
  @Input() placeholderType?: string;
  isLoaded = true;
  showLoader = true;

  constructor() {}

  ngOnInit(): void {}

  onLoad() {
    this.isLoaded = false;
    this.showLoader = false;
  }

  onError() {
    this.isLoaded = false;
    this.showLoader = false;
    this.src = 'assets/images/avatars/1.png';
  }
}
