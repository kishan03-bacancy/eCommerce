import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { API } from '../../../shared/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apiService: ApiService) {}

  getProductList(page: number = 1) {
    const limit = 100;
    this.apiService.get(API.PRODUCTS.LIST, { limit });
  }
}
