import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from './category.reducer';

export const selectCategoryFeature =
  createFeatureSelector<CategoryState>('categories');

export const categories = createSelector(
  selectCategoryFeature,
  (state: CategoryState) => state?.categories
);
export const isLoading = createSelector(
  selectCategoryFeature,
  (state: CategoryState) => state?.isLoading
);
