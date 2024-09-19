import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductModel } from '../model/productState.model';

const getProductState = createFeatureSelector<ProductModel>('product');
export const getProductList = createSelector(getProductState, (state) => {
  return state.list;
});
