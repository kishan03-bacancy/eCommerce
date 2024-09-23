import { createAction, props } from '@ngrx/store';

export const loadProduct = createAction(
  '[Product] loadProduct',
  props<{ category: string }>()
);
export const loadProductSuccess = createAction(
  '[Product] loadProductSuccess',
  props<{ products: any[]; category: string }>()
);
export const loadProductFailure = createAction(
  '[Product] loadProductFailure',
  props<{ errorMessage: string }>()
);
