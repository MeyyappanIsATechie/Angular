import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  template: ` <p>contact works!</p> `,
  styleUrl: './contact.component.css',
})
export class ContactComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('Contact Component initialized');
  }

  ngDoCheck(): void {
    console.log('Contact Component checked');
  }

  ngAfterContentInit(): void {
    console.log('Contact Component content initialized');
  }

  ngAfterContentChecked(): void {
    console.log('Contact Component content checked');
  }

  ngAfterViewInit(): void {
    console.log('Contact Component view initialized');
  }

  ngAfterViewChecked(): void {
    console.log('Contact Component view checked');
  }
}
