import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CandidatService} from "../_services/candidat.service";
import {Candidat} from "../_services/candidat";
import {FileUploadService} from "../_services/file-upload.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-candidat-details',
  templateUrl: './candidat-details.component.html',
  styleUrls: ['./candidat-details.component.css']
})
export class CandidatDetailsComponent implements OnInit {

  id: number | undefined;
  candidat: any ;
  fileURL:any;
  fileInfos: any;
  constructor(private candidatService: CandidatService,private route: ActivatedRoute, private uploadService:FileUploadService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.candidat = new Candidat();
    this.candidatService.getCandidatById(this.id).subscribe(data => {
      this.candidat = data;
      this.uploadService.getFile(16).subscribe(file=>{
        this.fileInfos=file;
        console.log(this.fileInfos)
      });

      });

  }
}
