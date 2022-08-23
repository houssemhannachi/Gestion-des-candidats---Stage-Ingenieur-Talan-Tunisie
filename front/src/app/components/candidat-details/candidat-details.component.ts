import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CandidatService} from "../../_services/candidat.service";
import {Candidat} from "../../_services/candidat";
import {FileUploadService} from "../../_services/file-upload.service";

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

  constructor(private candidatService: CandidatService, private route: ActivatedRoute, private uploadService: FileUploadService) {
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

  }
}
