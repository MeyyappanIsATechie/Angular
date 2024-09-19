import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-appmenu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css',
})
export class AppmenuComponent implements DoCheck {
  showMenu = true;
  constructor(private router: Router, public service: ProductService) {}
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl.includes('login') || currentUrl.includes('register')) {
      this.showMenu = false;
    } else {
      this.showMenu = true;
    }
  }
}
