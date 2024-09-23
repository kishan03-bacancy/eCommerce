import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductFeature =
  createFeatureSelector<ProductState>('products');

export const products = (category: string) =>
  createSelector(
    selectProductFeature,
    (state: ProductState) => state?.products[category]
  );

export const productDetail = (id: number, category: string) =>
  createSelector(selectProductFeature, (state: ProductState) =>
    state?.products?.[category]?.find((p: any) => p.id === id)
  );

export const isLoading = createSelector(
  selectProductFeature,
  (state: ProductState) => state?.isLoading
);
