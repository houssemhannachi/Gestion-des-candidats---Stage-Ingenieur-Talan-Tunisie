import { Component, OnInit } from '@angular/core';
import {StorageService} from "../_services/storage.service";
import {DossierService} from "../_services/dossier.service";
import {EntretienService} from "../_services/entretien.service";

@Component({
  selector: 'app-dossier-candidature-list',
  templateUrl: './dossier-candidature-list.component.html',
  styleUrls: ['./dossier-candidature-list.component.css']
})
export class DossierCandidatureListComponent implements OnInit {

  dossiers:any;
  currentUser?:any;
  totalLength: any;
  p: number | undefined;
  public entretiens: any = [];
  constructor(private storageService:StorageService,private dossierService:DossierService,private entretienService:EntretienService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.dossierService.getDossierByManager(this.currentUser.id).subscribe(data => {
        this.dossiers=data;
        this.totalLength=this.dossiers.length;
      },
      err => {
        console.error(err)
      })

  }



}
