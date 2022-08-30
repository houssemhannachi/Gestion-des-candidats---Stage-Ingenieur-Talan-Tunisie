import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchManager'
})
export class SearchManagerPipe implements PipeTransform {

  transform(managers:User[], searchState: String){
    if (!dossiers|| !searchState) {
      return dossiers;
    }
    return dossiers.filter(data =>
      data.statut.toLocaleLowerCase().includes(searchState.toLocaleLowerCase()));


  }
}
