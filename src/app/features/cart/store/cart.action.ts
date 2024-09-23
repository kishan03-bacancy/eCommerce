import { createAction, props } from '@ngrx/store';

export const addItemToCart = createAction(
  '[Cart] addItemToCart',
  props<{ product: any }>()
);
export const removeItemFromCart = createAction(
  '[Cart] removeItemFromCart',
  props<{ id: number }>()
);
