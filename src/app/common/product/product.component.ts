import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
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
export class ProductComponent implements OnInit {
  constructor(
    public productService: ProductService,
    private dialog: MatDialog
  ) {}
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
  loadProducts() {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.productsList = products;
      this.dataSource = new MatTableDataSource(this.productsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createProduct() {
    this.openPopup();
  }

  openPopup() {
    this.dialog
      .open(AddproductComponent, {
        width: '40%',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
      })
      .afterClosed()
      .subscribe((result: any) => {
        this.loadProducts();
      });
  }
}
