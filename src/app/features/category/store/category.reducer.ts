import { Action, createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.action';

export type CategoryState = {
  categories: any[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: CategoryState = {
  categories: [],
  isLoading: true,
  filter: { query: '', order: 'asc' },
};

const CategoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategorySuccess, (state, { categories }) => ({
    ...state,
    categories,
    isLoading: false,
  })),
  on(CategoryActions.loadCategoryFailure, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
  }))
);

export function reducer(state: CategoryState | undefined, action: Action) {
  return CategoryReducer(state, action);
}
