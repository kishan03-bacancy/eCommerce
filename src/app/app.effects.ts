import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoryActions from './features/category/store/category.action';
import * as ProductActions from './features/products/store/product.action';
import { ApiService } from './shared/services/api.service';
import { API } from './shared/constants/api.constant';
import { catchError, delay, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private stores$ = inject(Store);
  private api = inject(ApiService);

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadCategory),
      switchMap(() =>
        this.api.get(API.CATEGORY.LIST).pipe(
          // delay(1500),
          map((res: any) =>
            CategoryActions.loadCategorySuccess({
              categories: res,
            })
          ),
          catchError((error: { message: string }) =>
            of(
              CategoryActions.loadCategoryFailure({
                errorMessage: 'Fail to load products',
              })
            )
          )
        )
      )
    )
  );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      switchMap((payload) => {
        const limit = 100;
        console.log(payload?.category);
        return this.api
          .get(API.PRODUCTS.LIST + payload?.category, { limit })
          .pipe(
            // delay(1500),
            map((res: any) =>
              ProductActions.loadProductSuccess({
                products: res?.products,
                category: payload?.category,
              })
            ),
            catchError((error: { message: string }) =>
              of(
                ProductActions.loadProductFailure({
                  errorMessage: 'Fail to load products',
                })
              )
            )
          );
      })
    )
  );
}
