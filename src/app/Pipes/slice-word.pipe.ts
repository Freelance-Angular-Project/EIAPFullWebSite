import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceWord',
  standalone: true
})
export class SliceWordPipe implements PipeTransform {

  transform(value: string, wordLimit: number=10): string {
    if (!value || wordLimit <= 0) {
      return '';
    }

    const words = value.split(' '); // Split the input string into an array of words

    // If the array length is less than or equal to the word limit,
    // return the original string
    if (words.length <= wordLimit) {
      return value;
    }

    // Slice the array to the required number of words and join it back into a string
    return words.slice(0, wordLimit).join(' ') + '...';
  }
}
