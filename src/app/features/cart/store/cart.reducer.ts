import { Action, createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.action';
import { cartCount } from './cart.selector';

export type CartState = {
  items: any[];
};

const initialState: CartState = {
  items: [],
};

const CartReducer = createReducer(
  initialState,
  on(CartActions.addItemToCart, (state, { product }) => {
    console.log(product, state.items);
    // let items: any = JSON.parse(JSON.stringify(state.items));
    let items: any = structuredClone(state.items);
    const exist = items.find((p: any) => p.id === product.id);
    if (exist) {
      exist.cartCount += 1;
    } else {
      const item = { ...product, cartCount: 1 };
      items = [...state.items, item];
    }
    return { ...state, items };
  }),
  on(CartActions.removeItemFromCart, (state, { id }) => {
    // let items: any = JSON.parse(JSON.stringify(state.items));
    let items: any = structuredClone(state.items);
    const exist = items.find((p: any) => p.id === id);
    if (exist) {
      if (exist.cartCount > 1) {
        exist.cartCount -= 1;
      } else {
        items = items.filter((p: any) => p.id !== id);
      }
    }
    return { ...state, items };
  })
);

export function reducer(state: CartState | undefined, action: Action) {
  return CartReducer(state, action);
}
