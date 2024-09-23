import { createAction, props } from '@ngrx/store';

export const loadCategory = createAction('[Category] loadCategory');
export const loadCategorySuccess = createAction(
  '[Category] loadCategorySuccess',
  props<{ categories: any[] }>()
);
export const loadCategoryFailure = createAction(
  '[Category] loadCategoryFailure',
  props<{ errorMessage: string }>()
);
