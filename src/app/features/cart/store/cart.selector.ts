import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCategoryFeature = createFeatureSelector<CartState>('cart');

export const cartItems = createSelector(
  selectCategoryFeature,
  (state: CartState) => state?.items
);
export const cartCount = createSelector(
  selectCategoryFeature,
  (state: CartState) =>
    state?.items?.map((i) => i?.cartCount ?? 1)?.reduce((a, b) => a + b, 0)
);
