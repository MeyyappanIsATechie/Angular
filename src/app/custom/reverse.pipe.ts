import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverseStr', standalone: true })
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}
