import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceFirstWord',
  standalone: true,
})
export class SliceFirstWordPipe implements PipeTransform {
  transform(value: string, limit: number = 5): string {
    if (!value) return value;

    const firstWord = value.split(' ')[0];
    return firstWord.length > limit
      ? firstWord.substring(0, limit) + '...'
      : firstWord;
  }
}
