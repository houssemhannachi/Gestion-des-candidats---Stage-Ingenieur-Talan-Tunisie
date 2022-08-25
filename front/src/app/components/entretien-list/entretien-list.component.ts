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
        "<h3>Bonjour ,</h3>",
        "<h2>Votre dossier de candidature est : <br>",
        entretien.text, " ", entretien.dossiers.intitule,
        "</h2><p> Nous vous prions de bien vouloir vous rendre à : ",
        dateDebut,
        "<br>Cet entretien aura lieu avec notre manager  : ",
        entretien.dossiers.user.name,
        "<br>Nous vous prions d'agréer nos respectueuses salutations.</p>",
        "<br> <b>Cordialement.</b>"
        );
      msgManager = msgManager.concat(
        "<h3>Bonjour ,</h3>",
        "<p><br><b>Le dossier de candidature est :</b>",
        entretien.text, " ", entretien.dossiers.intitule,
        "<br><b>Date :</b> ", dateDebut,
        "<br><b>Le candidat est :</b> ",
        entretien.dossiers.candidat.nom,
        " ",
        entretien.dossiers.candidat.prenom , "</p>",
        "<br> <b>Cordialement.</b>"
        )
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
        "<h2>Bonjour,</h2>",
        "<h3><b>Le dossier de candidature :</b> ", entretien.dossiers.intitule,
        "<br></h3><p><b>Le Manager :</b>", entretien.dossiers.user.name,
        "<br>Date entretien refusé:", dateDebut,
        "<br><span style='color: #6a1a21'>Je vous propose de décaler la date d'entretien de recrutement</span></p>",
        "<br> <b>Cordialement.</b>" )
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
