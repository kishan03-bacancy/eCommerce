import { signalStore, withState } from '@ngrx/signals';

type CategoriesState = {
  categories: any[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const CategoriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState)
);
