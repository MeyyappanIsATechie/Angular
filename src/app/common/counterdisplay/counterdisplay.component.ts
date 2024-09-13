import { Component, computed, effect, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counterdisplay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counterdisplay.component.html',
  styleUrl: './counterdisplay.component.css',
})
export class CounterdisplayComponent implements OnInit {
  displayValue: any;
  totalPlayers = computed(() => this.service.players().length);
  _totalPlayers$ = toObservable(this.totalPlayers);
  _signalCount = toSignal(this._totalPlayers$);
  constructor(public service: MasterService) {
    // effect(() => {
    //   this.displayValue = this.service.counterValue();
    //   return () => {}; // unsubscribe onDestroy
    // });
  }
  ngOnInit(): void {
    this.displayValue = this.service.counterValue;
  }
}
