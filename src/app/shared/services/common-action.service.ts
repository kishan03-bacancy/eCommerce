// modules
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { svgIcons } from '../constants/svg-icons.data';
import { SVGIcon } from '../models/svg-icon.model';

@Injectable({
  providedIn: 'root',
})
export class CommonActionService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

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

  // find item by unique id
  findItemByKey(data: any[], key: string, value: any) {
    return data.find((item: any) => item[key] === value);
  }

  // create breadcrumbs
  createBreadcrumbs(data: string): any[] {
    const list = [];
    let arr = data.split('|');
    arr.pop();
    arr = arr.reverse().map((a) => a.trim());
    for (let i = 0; i < arr.length; i++) {
      list.push({
        label: arr[i],
        url:
          i > 0
            ? arr[i - 1].toLowerCase() + '/' + arr[i].toLowerCase()
            : arr[i].toLowerCase(),
      });
    }
    return list;
  }

  // sort data
  sortData(data: any[], field: string, order: 'asc' | 'desc' = 'asc') {
    if (order === 'desc') {
      return data.sort((a, b) =>
        b[field] > a[field] ? 1 : b[field] < a[field] ? -1 : 0
      );
    }
    return data.sort((a, b) =>
      a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0
    );
  }
}
