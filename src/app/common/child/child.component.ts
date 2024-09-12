import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  @Input() inputdata: any;
  @Input() inputdata2: any;
  @Input() nameObj: any;
  @Output() dataUpdater = new EventEmitter<string>();
  fruits = ['apple', 'orange'];
  updateFruits(data: string) {
    this.fruits.push(data);
    return 'data added';
  }
}
