import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DossierCandidature} from "../../_services/dossier.candidature";
import {DossierService} from "../../_services/dossier.service";

@Component({
  selector: 'app-dossier-details',
  templateUrl: './dossier-details.component.html',
  styleUrls: ['./dossier-details.component.css']
})
export class DossierDetailsComponent implements OnInit {

id: number | undefined;
dossier: any;
constructor(private dossierService: DossierService ,private route: ActivatedRoute) { }

ngOnInit(): void {
  this.id = this.route.snapshot.params['id'];

  this.dossier = new DossierCandidature();
  this.dossierService.getDossierById(this.id).subscribe(data => {
    this.dossier = data;
    console.log(this.dossier)
  });
}
  checkstatut(statut:string) : string{
    if(statut=="En_attente") {
      return "En attente";
    }
    else if(statut=="En_cours") {
      return "En cours"
    }
    else if(statut=="Accepte") {
      return "Accepté"
    }
    else if(statut=="Refuse") {
      return "Refusé"}
    else {
      return ""
    }
  }

  checkstyle(statut:string) : string{
    if(statut=="En_attente") {
      return "bi bi-pause-circle";
    }
    else if((statut=="En_cours")) {
      return "bi bi-play"
    }
    else {
      return ""
    }
  }

}
