import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-counterbutton',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './counterbutton.component.html',
  styleUrl: './counterbutton.component.css',
})
export class CounterbuttonComponent {
  constructor(public service: MasterService) {}
  increment() {
    this.service.counterValue.update((prev) => prev + 1);
  }
  decrement() {
    this.service.counterValue.update((prev) => prev - 1);
  }
  reset() {
    this.service.counterValue.set(0);
  }

  addUser(name: string) {
    let id = this.service.players().length + 1; //() important
    this.service.players.update((prev) => [...prev, { id: id, name: name }]);
  }
}
