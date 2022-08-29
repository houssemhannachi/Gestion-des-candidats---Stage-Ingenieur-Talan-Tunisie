import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  entretiens: any = [];
  entretienValide: any;
  entretienAttente: any;
  test: any;

  constructor(private dossierService: DossierService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.dossier = new DossierCandidature();
    this.dossierService.getDossierById(this.id).subscribe(data => {
      this.dossier = data;
      this.dossier.entretiens.forEach((e: any) => {
        this.entretiens = this.entretiens.concat(e.state)
      })
      if (this.dossier.entretiens.length > 0) {
        this.entretienAttente = "En attente";
      }
      this.test = this.entretiens.includes('VALIDE');

      if (this.entretiens.includes('VALIDE')) {
        this.entretienValide = "Entretien planifié et validé"
      } else if (this.entretiens.includes('EN_ATTENTE')) {
        this.entretienValide = "En attente de validation de manager"
      } else {
        this.entretienValide = "En cours";
      }
      this.entretiens.forEach((e: any) => {
        if (e == 'REFUSE') {
          this.entretienAttente = "Proposition d'entretien refusé par le manager";
        } else {
          this.entretienAttente = "En attente";
        }
      })

      if (this.dossier.entretiens.length == 0) {
        this.entretienAttente = "Pas d'entretien planifié";
      }


    });
  }


}
