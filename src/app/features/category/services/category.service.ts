import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { API } from '../../../shared/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apiService: ApiService) {}

  getCategoryList() {
    this.apiService.get(API.CATEGORY.LIST);
  }
}
