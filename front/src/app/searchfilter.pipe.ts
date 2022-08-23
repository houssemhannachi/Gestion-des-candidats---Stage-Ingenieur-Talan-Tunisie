import {Pipe, PipeTransform} from '@angular/core';
import {Candidat} from './_services/candidat';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(candidats: Candidat[], searchValue: String): Candidat[] {

    if (!candidats || !searchValue) {
      return candidats;
    }
    return candidats.filter(data =>
      data.nom.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));


  }

}
