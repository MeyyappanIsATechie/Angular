import { Product } from './product.model';

export interface ProductModel {
  list: Product[];
  errorMsg: string;
}
