import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Product } from '../../model/product.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent implements OnInit {
  _dialogdata = {
    id: 0,
    title: '',
  };
  _productinfo!: Product;
  productForm: any;
  constructor(
    private service: ProductService,
    private builder: FormBuilder,
    private ref: MatDialogRef<AddproductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.builder.group({
      id: this.builder.control({ value: 0, disabled: true }),
      name: this.builder.control('', Validators.required),
      price: this.builder.control(1, Validators.required),
      description: this.builder.control('', Validators.required),
      status: this.builder.control(true, Validators.required),
    });
  }
  ngOnInit(): void {
    this._dialogdata = this.data;
    if (this._dialogdata.title === 'Edit Product') {
      //convert to number
      // console.log(this._dialogdata.id);
      this.service.getProductById(this._dialogdata.id).subscribe((item) => {
        //console.log(this._dialogdata.id);
        this._productinfo = item;
        this.productForm.setValue({
          id: this._productinfo.id,
          name: this._productinfo.name,
          price: this._productinfo.price,
          description: this._productinfo.description,
          status: this._productinfo.status,
        });
      });
    }
  }
  goToProductPage() {
    this.ref.close();
    // this.router.navigate(['/product']);
  }
  ProceedSave() {
    if (this.productForm.valid) {
      // Fetch all products to get the last id
      this.service.getAllProducts().subscribe((products: Product[]) => {
        // Find the max id from the existing products
        const maxId =
          products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;

        let _data: Product = {
          id: (maxId + 1) as number, // Increment the last id
          name: this.productForm.value.name as string,
          price: this.productForm.value.price as number,
          description: this.productForm.value.description as string,
          status: this.productForm.value.status as boolean,
        };

        if (this._dialogdata.id != 0) {
          _data.id = this._dialogdata.id as number;
          this.service.updateProduct(_data).subscribe((item) => {
            alert('Product updated successfully');
            this.productForm.reset();
            this.ref.close();
          });
        } else {
          this.service.addProduct(_data).subscribe((item) => {
            alert('Product created successfully');
            this.productForm.reset();
            this.ref.close();
          });
        }
      });
    }
  }
}
