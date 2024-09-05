import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseurl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.baseurl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseurl}/${id}`);
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.baseurl, product);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(this.baseurl + '/' + product.id, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseurl + '/' + id);
  }
}
