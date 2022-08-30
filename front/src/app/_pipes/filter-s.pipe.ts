import { Pipe, PipeTransform } from '@angular/core';
import { DossierCandidature } from '../_services/dossier.candidature';

@Pipe({
  name: 'filterS'
})
export class FilterSPipe implements PipeTransform {

  transform(dossiers: DossierCandidature[], searchState: String){
    if (!dossiers|| !searchState) {
      return dossiers;
    }
    return dossiers.filter(data =>
      data.statut.toLocaleLowerCase().includes(searchState.toLocaleLowerCase()));


  }

}
