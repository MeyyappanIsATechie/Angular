import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReversePipe } from '../custom/reverse.pipe';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatCheckbox,
    CommonModule,
    ReversePipe,
    FormsModule,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'myapp';
  subtitle = 'SUB-TITLE';
  today = new Date();
  price = 1234.56;
  percentage = 0.25;
  user = { name: 'John', age: 30 };
  text = 'Angular';
  numbers = [1, 2, 3, 4, 5];
  observable$: Observable<string> = of('Hello from Observable!');
  isDisabled: boolean = false;
  name: string = '';
  _class = 'active';
  _color = 'yellow';
  _font = '36px';
  isDisplay = false;
  ticketInfo = [
    { id: 1, name: 'Angular', color: 'red' },
    { id: 2, name: 'React', color: 'blue' },
    { id: 3, name: 'Vue', color: 'green' },
  ];
  _view = 'home';
  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
  updateTitle(event: any) {
    this.title = event.target.value;
  }
}
