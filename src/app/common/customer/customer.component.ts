import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterOutlet, MatButton, RouterLink, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  userInput = '';
  canNavigate() {
    if (this.userInput !== '') {
      if (
        confirm('Are you sure you want to navigate. data will be lost then')
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
