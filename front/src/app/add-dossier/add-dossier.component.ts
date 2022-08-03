import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DossierCandidature} from "../_services/DossierCandidature";
import {DossierService} from "../_services/dossier.service";




@Component({
  selector: 'app-add-dossier',
  templateUrl: './add-dossier.component.html',
  styleUrls: ['./add-dossier.component.css']
})
export class AddDossierComponent implements OnInit {


    dossier: DossierCandidature = new DossierCandidature();
    dossiers: any;
    public statuts= [
      {id: 1, name: 'En_attente', statut: 'En_attente'},
      {id: 2, name: 'En_cours', statut: 'En_cours'},
      {id: 3, name: 'accepte', statut: 'accepte'},
      {id: 4, name: 'refuse', statut: 'refuse'}]
  
  
    constructor( private DossierService: DossierService,private router: Router) { }

    ngOnInit(): void {
    }

    check = function(statut : String) : number {
      if (statut=="En_attente") { return 1 }
      else if (statut=="En_cours") { return 2 }
      else if (statut=="accepte") { return 3}
      else if (statut=="refuse") { return 4}
      else { return 0 }
    }
    save(){
      this.DossierService.create(this.dossier).subscribe( data =>{
        console.log(data);
        this.goToList();
      },
      error => console.log(error));
    }

    goToList(){
      this.router.navigate(['/dossier']);
    }

    onSubmit(){
      console.log(this.dossier);
      this.save();
    }
  }



