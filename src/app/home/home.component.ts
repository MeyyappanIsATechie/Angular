import {
  ChangeDetectorRef,
  Component,
  NgZone,
  signal,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReversePipe } from '../custom/reverse.pipe';
import { RouterOutlet } from '@angular/router';
import { MasterService } from '../service/master.service';
import { Customer } from '../model/master.model';
import { ChildComponent } from '../common/child/child.component';

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
    ChildComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  _custdata!: Customer[];
  constructor(private service: MasterService, private ngZone: NgZone) {
    this.getAllCustomers();
    setTimeout(() => {
      this.ngZone.run(() => {
        this.title1.set('Angular myapp');
      });
    }, 2000);
  }
  @ViewChild(ChildComponent) _child!: ChildComponent;
  title = 'myapp';
  title1 = signal<string>('myapp1');
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
  inputdata: any = '';
  inputdata2: any = '';
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
  updateTitle1(title: string) {
    this.title = title;
  }

  getAllCustomers() {
    this.service.getAllCustomers().subscribe((item) => {
      this._custdata = item;
      console.log(this._custdata);
    });
  }
  trackById(index: number, item: any): number {
    return item.id; // or any unique identifier
  }
  addFruit(fruit: any): void {
    let res = this._child.updateFruits(fruit);
    console.log(res);
  }
}
