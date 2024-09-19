import {
  Component,
  NgModule,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { catchError, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit, OnDestroy {
  constructor(
    public productService: ProductService,
    private dialog: MatDialog
  ) {}
  subscription!: Subscription;
  productsList: Product[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'description',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadProducts();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  loadProducts() {
    let sub1 = this.productService
      .getAllProducts()
      .pipe(
        catchError((err) => {
          console.log(err.message);
          return of([]);
        })
      )
      .subscribe((products: Product[]) => {
        this.productsList = products;
        this.dataSource = new MatTableDataSource(this.productsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    this.subscription.add(sub1);
  }

  createProduct() {
    this.openPopup(0, 'Create Product');
  }

  openPopup(id: number, title: string) {
    this.dialog
      .open(AddproductComponent, {
        width: '40%',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: { id: id, title: title },
      })
      .afterClosed()
      .subscribe((result: any) => {
        this.loadProducts();
      });
  }

  editProduct(id: any) {
    //conversion
    const newId: number = Number(id);
    this.openPopup(newId, 'Edit Product');
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      let sub2 = this.productService.deleteProduct(id).subscribe(() => {
        alert('Product deleted successfully');
        this.loadProducts();
      });
      this.subscription.add(sub2);
    }
  }
}
