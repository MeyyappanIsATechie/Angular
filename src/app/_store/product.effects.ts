import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadProducts,
  loadProductsFail,
  loadProductsSuccess,
} from './product.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ProductService } from '../service/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductEffect {
  constructor(private actions$: Actions, private service: ProductService) {}

  loadProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      exhaustMap((action) => {
        return this.service.getAllProducts().pipe(
          map((data) => {
            return loadProductsSuccess({ list: data });
          }),
          catchError((err) => of(loadProductsFail({ error: err.message })))
        );
      })
    )
  );
}
