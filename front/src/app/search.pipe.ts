import { Pipe, PipeTransform } from '@angular/core';
import { DossierCandidature } from './_services/dossier.candidature';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(dossiers: DossierCandidature[],searchValue:String):DossierCandidature[] {
    if(!dossiers || !searchValue){
      return dossiers;
    }
    return dossiers.filter(data=>
      data.intitule.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
      
      
  }
  }


