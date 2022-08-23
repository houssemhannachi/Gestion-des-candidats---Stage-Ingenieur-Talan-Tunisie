import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../_services/storage.service";
import {DossierService} from "../../_services/dossier.service";
import {EntretienService} from "../../_services/entretien.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dossier-candidature-list',
  templateUrl: './dossier-candidature-list.component.html',
  styleUrls: ['./dossier-candidature-list.component.css']
})
export class DossierCandidatureListComponent implements OnInit {
  dossier: any;
  dossiers: any;
  currentUser?: any;
  totalLength: any;
  p: number | undefined;
  public entretiens: any = [];

  constructor(private router: Router,
              private storageService: StorageService,
              private dossierService: DossierService,
              private entretienService: EntretienService) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.dossierService.getDossierByManager(this.currentUser.id).subscribe(data => {
        this.dossiers = data;
        this.totalLength = this.dossiers.length;
      },
      err => {
        console.error(err)
      })

  }


  accepter(id: any) {
    this.dossier = this.dossierService.getDossierById(id);
    this.dossier.statut = "Accepte"
    this.dossierService.update(id, this.dossier).subscribe(result => this.listDossier());
  }

  reloadPage(): void {
    window.location.reload();
  }

  refuser(id: any) {
    this.dossier = this.dossierService.getDossierById(id);
    this.dossier.statut = "Refuse"
    this.dossierService.update(id, this.dossier).subscribe(result => this.listDossier());
  }

  checkstyle(statut: string): string {
    if (statut == "En_attente") {
      return "bi bi-pause-circle";
    } else if ((statut == "En_cours")) {
      return "bi bi-play"
    } else if (statut == "Accepte") {
      return "bi bi-check2-circle"
    } else if (statut == "Refuse") {
      return "bi bi-x-circle-fill"
    } else {
      return ""
    }
  }

  checkstatut(statut: string): string {
    if (statut == "En_attente") {
      return "En attente";
    } else if (statut == "En_cours") {
      return "En cours"
    } else if (statut == "Accepte") {
      return "Accepté"
    } else if (statut == "Refuse") {
      return "Refusé"
    } else {
      return ""
    }
  }

  private listDossier() {
    setTimeout(() => {
      this.reloadPage();
    }, 0);
    this.router.navigate(['/dossierCandidatureList']);
  }
}
