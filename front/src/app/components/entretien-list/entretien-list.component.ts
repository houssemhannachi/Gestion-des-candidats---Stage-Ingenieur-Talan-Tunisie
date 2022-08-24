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
  e: any;

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
          ((d: any) => {

            d.entretiens.forEach(
              (e: any) => {
                if (e.state == 'EN_ATTENTE') {
                  e.dossiers = d;
                  this.entretiens = this.entretiens.concat(e);
                }}
              )
              }
          ));
        this.totalLength = this.entretiens.length;
      },
      err => {
        console.error(err)
      })
  }


  accepter(entretien: any) {
    entretien.state = 'VALIDE';
    this.entretienService.updateState(entretien.id, entretien.state).subscribe(result => this.listDossier());
  }

  reloadPage(): void {
    window.location.reload();
  }

  refuser(entretien: any) {
    entretien.state = 'REFUSE';
    this.entretienService.updateState(entretien.id, entretien.state).subscribe(result => this.listDossier());
  }

  private listDossier() {
    setTimeout(() => {
      this.reloadPage();
    }, 0);
    this.router.navigate(['/entretienList']);
  }


}
