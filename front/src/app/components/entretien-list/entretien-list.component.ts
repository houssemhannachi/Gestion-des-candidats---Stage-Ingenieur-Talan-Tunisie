import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../_services/storage.service";
import {DossierService} from "../../_services/dossier.service";
import {EntretienService} from "../../_services/entretien.service";
import {Router} from "@angular/router";
import {DatePipe} from '@angular/common';

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
  datepipe: DatePipe = new DatePipe('en-US');

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
                  }
                }
              )
            }
          ));
        this.totalLength = this.entretiens.length;
        console.log(this.entretiens)
      },
      err => {
        console.error(err)
      })
  }


  accepter(entretien: any) {
    entretien.state = 'VALIDE';
    let msgCandidat: string = '';
    let msgManager: string = '';
    let dateDebut = this.datepipe.transform(entretien.dateDebut, 'MMM d, y, h:mm:ss a');
    if (typeof dateDebut === "string") {
      msgCandidat = msgCandidat.concat(
        "\nMadame/Monsieur,",
        "\nDossier : ",
        entretien.text, " ", entretien.dossiers.intitule,
        "\nNous vous prions de bien vouloir vous rendre à : ",
        dateDebut,
        "\nCet entretien aura lieu avec Monsieur/Madame : ",
        entretien.dossiers.user.name,
        "\nNous vous prions d'agréer nos respectueuses salutations.");
      msgManager = msgManager.concat(
        "\nMadame/Monsieur,",
        "\nDossier : ",
        entretien.text, " ", entretien.dossiers.intitule,
        "\nDate : ", dateDebut,
        "\nCandidat : ",
        entretien.dossiers.candidat.nom,
        " ",
        entretien.dossiers.candidat.prenom)
    }
    this.entretienService.updateState(entretien.id, entretien.state).subscribe(result => this.listDossier());
    this.dossierService.mail({
      recipient: entretien.dossiers.candidat.email,
      msgBody: msgCandidat,
      subject: "Convocation à un entretien"
    }).subscribe((result => this.listDossier()));
    this.dossierService.mail({
      recipient: entretien.dossiers.user.email,
      msgBody: msgManager,
      subject: "Convocation à un entretien"
    }).subscribe((result => this.listDossier()));
  }

  reloadPage(): void {
    window.location.reload();
  }

  refuser(entretien: any) {
    let msgRH: string = '';
    let dateDebut = this.datepipe.transform(entretien.dateDebut, 'MMM d, y, h:mm:ss a');
    if (typeof dateDebut === "string") {
      msgRH = msgRH.concat(
        "\nMadame/Monsieur,",
        "\nDossier : ", entretien.dossiers.intitule,
        "\nManager :", entretien.dossiers.user.name,
        "\nDate entretien refusé:", dateDebut,
        "\nIl faut changer notre date d'entretien.")
    }
    entretien.state = 'REFUSE';
    this.entretienService.updateState(entretien.id, entretien.state).subscribe(result => this.listDossier());
    this.dossierService.mail({
      recipient: entretien.dossiers.createdBy.email,
      msgBody: msgRH,
      subject: "Refus de date d'entretien"
    }).subscribe((result => this.listDossier()));
  }

  private listDossier() {
    setTimeout(() => {
      this.reloadPage();
    }, 0);
    this.router.navigate(['/entretienList']);
  }


  private sendEmailCandidat() {
    this.dossierService.mail({
      recipient: this.dossier.candidat.email,
      msgBody: "You have a meeting.",
      subject: this.dossier.intitule
    }).subscribe((result => this.listDossier()));

  }

  private sendEmailManager() {
    this.dossierService.mail({
      recipient: this.dossier.user.email,
      msgBody: "You have a meeting, please check your calendar.",
      subject: this.dossier.intitule
    }).subscribe((result => this.listDossier()));

  }
}
