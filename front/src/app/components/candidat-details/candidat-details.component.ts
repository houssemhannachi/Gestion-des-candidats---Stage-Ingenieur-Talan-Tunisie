import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CandidatService} from "../../_services/candidat.service";
import {Candidat} from "../../_services/candidat";
import {FileUploadService} from "../../_services/file-upload.service";
import {DossierService} from "../../_services/dossier.service";

@Component({
  selector: 'app-candidat-details',
  templateUrl: './candidat-details.component.html',
  styleUrls: ['./candidat-details.component.css']
})
export class CandidatDetailsComponent implements OnInit {

  id: number | undefined;
  candidat: any;
  fileURL: any;
  fileInfos: any;
  imageInfos: any;
  dossier: any;

  constructor(private dossierService: DossierService,
              private candidatService: CandidatService,
              private route: ActivatedRoute,
              private uploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.candidat = new Candidat();
    this.candidatService.getCandidatById(this.id).subscribe(data => {
      this.candidat = data;
      this.uploadService.getFile(this.candidat.fileDB.id).subscribe(file => {
        this.fileInfos = file;
      });
      this.uploadService.getImage(this.candidat.photo.id).subscribe(file => {
        this.imageInfos = file;
        console.log(this.imageInfos)
      });

    });
    this.dossierService.getDossierByCandidat(this.id).subscribe(data=>{
      this.dossier=data;
    })

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
      return " En attente";
    } else if (statut == "En_cours") {
      return " En cours"
    } else if (statut == "Accepte") {
      return " Accepté"
    } else if (statut == "Refuse") {
      return " Refusé"
    } else {
      return ""
    }
  }
}
