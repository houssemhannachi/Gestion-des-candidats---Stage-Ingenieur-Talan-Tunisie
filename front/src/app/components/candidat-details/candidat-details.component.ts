import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CandidatService} from "../../_services/candidat.service";
import {Candidat} from "../../_entities/candidat";
import {FileUploadService} from "../../_services/file-upload.service";
import {DossierService} from "../../_services/dossier.service";
import Utils from "../../_utils/utils";

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
  utils=new Utils();
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
    this.dossierService.getDossierByCandidat(this.id).subscribe(data => {
        this.dossier = data;
        this.dossier.forEach(
          (d: any) => {
            d.etat = [];
            d.entretiens.forEach(
              (e: any) => {
                d.etat = d.etat.concat(e.state)
              }
            )
          }
        )

      }
    )}


}
