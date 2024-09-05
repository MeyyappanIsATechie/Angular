import { Component } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Product } from '../../model/product.model';
import { MatDialogRef } from '@angular/material/dialog';

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
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent {
  productForm: any;
  constructor(
    private service: ProductService,
    private builder: FormBuilder,
    private ref: MatDialogRef<AddproductComponent>
  ) {
    this.productForm = this.builder.group({
      id: this.builder.control({ value: 0, disabled: true }),
      name: this.builder.control('', Validators.required),
      price: this.builder.control(1, Validators.required),
      description: this.builder.control('', Validators.required),
      status: this.builder.control(true, Validators.required),
    });
  }
  ProceedSave() {
    if (this.productForm.valid) {
      // Fetch all products to get the last id
      this.service.getAllProducts().subscribe((products: Product[]) => {
        // Find the max id from the existing products
        const maxId =
          products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;

        let _data: Product = {
          id: maxId + 1, // Increment the last id
          name: this.productForm.value.name as string,
          price: this.productForm.value.price as number,
          description: this.productForm.value.description as string,
          status: this.productForm.value.status as boolean,
        };

        this.service.addProduct(_data).subscribe((item) => {
          alert('Product created successfully');
          this.productForm.reset();
          this.ref.close();
        });
      });
    }
  }
}
