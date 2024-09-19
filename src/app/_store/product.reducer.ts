import { createReducer, on } from '@ngrx/store';
import { productState } from './product.state';
import { loadProductsFail, loadProductsSuccess } from './product.action';
//import { state } from '@angular/animations';

const productReducer = createReducer(
  productState,
  on(loadProductsSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errorMsg: '',
    };
  }),
  on(loadProductsFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMsg: action.error,
    };
  })
);

export function productReducerFn(state: any, action: any) {
  return productReducer(state, action);
}
