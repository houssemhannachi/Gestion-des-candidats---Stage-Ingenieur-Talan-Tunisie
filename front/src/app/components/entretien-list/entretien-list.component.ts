import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../_services/storage.service";
import {DossierService} from "../../_services/dossier.service";
import {EntretienService} from "../../_services/entretien.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-entretien-list',
  templateUrl: './entretien-list.component.html',
  styleUrls: ['./entretien-list.component.css']
})
export class EntretienListComponent implements OnInit {
  dossiers: any;
  dossier: any;
  currentUser?: any;
  totalLength: any;
  p: number | undefined;
  entretiens: any = [];

  constructor(private router: Router,
              private storageService: StorageService,
              private dossierService: DossierService,
              private entretienService: EntretienService) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.dossierService.getDossierByManager(this.currentUser.id).subscribe(data => {
        this.dossiers = data;

        this.dossiers.forEach(
          ((d: { entretiens: any; idDossier: any; }) => {
            d.entretiens.forEach(
              (p: {
                dossiers: { entretiens: any; idDossier: any };
                entretiens: any;
              }) => {
                p.dossiers = d;
                this.entretiens = this.entretiens.concat(p);
              }
            )
          }));
        this.totalLength = this.entretiens.length;
        console.log(this.entretiens)
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

  private listDossier() {
    setTimeout(() => {
      this.reloadPage();
    }, 0);
    this.router.navigate(['/dossierCandidatureList']);
  }


}
