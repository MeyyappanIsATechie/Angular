import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  concat,
  delay,
  filter,
  first,
  map,
  merge,
  Observable,
  of,
  reduce,
} from 'rxjs';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css',
})
export class LearnComponent implements OnInit {
  observable = new Observable((subscriber) => {
    subscriber.next('Hello');
    subscriber.next('World');
    setTimeout(() => {
      subscriber.next('This is an Observable');
      subscriber.complete();
    }, 3000);
    //wont work
    subscriber.next('helloworld');
  });
  ticketInfo = [
    { id: 1, name: 'Angular', color: 'red' },
    { id: 2, name: 'React', color: 'blue' },
    { id: 3, name: 'Vue', color: 'green' },
  ];
  //of observable
  ticketInfo$ = of(this.ticketInfo);
  data$ = of(1, 2, 3);
  data1$ = of(4, 5, 6).pipe(delay(1000));

  ngOnInit(): void {
    // this.observable.subscribe(
    //   //   (data) => {
    //   //   console.log(data);
    //   // }
    //   {
    //     next: (data) => console.log(data),
    //     error: (err) => console.error(err),
    //     complete: () => console.log('Completed'),
    //   }
    // );
    // this.ticketInfo$.subscribe((data) => {
    //   console.log(data);
    // });
    this.data$
      ?.pipe(
        //map((data) => data * 2)
        //filter((data) => data % 2 === 0)
        reduce((acc, curr) => acc + curr, 0)
      )
      .subscribe((res) => {
        console.log(res);
      });
    //whichever data comes first
    merge(this.data$, this.data1$).subscribe((data) => {
      console.log(data);
    });
    //waits for delay
    concat(this.data$, this.data1$)
      .pipe(first()) //take, find, filter,every,catchError,switchMap
      .subscribe((data) => {
        console.log(data);
      });
  }
}
