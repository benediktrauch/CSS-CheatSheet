import {Pipe, PipeTransform} from '@angular/core';
import {Snippet} from '../services/snippet';

@Pipe({
  name: 'csscsFilter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Snippet[], ...args: any[]): Snippet[] {

    if (value) {
      console.log(value);
      const searchString = args[0].toLowerCase();

      const returnValue = value.filter(e => {
        return JSON.stringify(e)
          .toLowerCase()
          .includes(searchString);
      });

      if (args[0].length > 1) {
        return returnValue.length > 0 ? returnValue : [];
      } else {
        return value;
      }
    }
  }
}
