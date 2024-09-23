import { Action, createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.action';

export type ProductState = {
  products: any;
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: ProductState = {
  products: [],
  isLoading: true,
  filter: { query: '', order: 'asc' },
};

const ProductReducer = createReducer(
  initialState,
  on(ProductActions.loadProduct, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProductActions.loadProductSuccess, (state, { products, category }) => {
    let allProducts = structuredClone(state.products);

    Object.assign(allProducts, { [category]: products });
    return {
      ...state,
      products: { ...allProducts },
      isLoading: false,
    };
  }),
  on(ProductActions.loadProductFailure, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
  }))
);

export function reducer(state: ProductState | undefined, action: Action) {
  return ProductReducer(state, action);
}
