import { ActionReducerMap } from '@ngrx/store';
import { reducer as categoryReducer } from '../features/category/store/category.reducer';
import { reducer as productReducer } from '../features/products/store/product.reducer';
import { reducer as cartReducer } from '../features/cart/store/cart.reducer';

export interface State {
  categories: any;
  products: any;
  cart: any;
}

export const reducers: ActionReducerMap<State> = {
  categories: categoryReducer,
  products: productReducer,
  cart: cartReducer,
};
