import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../_services/storage.service";
import {DossierService} from "../../_services/dossier.service";
import {EntretienService} from "../../_services/entretien.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-entretien-list',
  templateUrl: './entretien-list.component.html',
  styleUrls: ['./entretien-list.component.css']
})
export class EntretienListComponent implements OnInit {
  dossiers: any;
  currentUser?: any;
  totalLength: any;
  p: number | undefined;
  entretiens: any = new Array();

  constructor(private storageService: StorageService, private dossierService: DossierService, private entretienService: EntretienService) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.dossierService.getDossierByManager(this.currentUser.id).subscribe(data => {
        this.dossiers = data;

        this.dossiers.map((d: { entretiens: any; }) => d.entretiens).forEach(
            (p: any)=>this.entretiens=this.entretiens.concat(p)
        );
        this.totalLength = this.entretiens.length;
        console.log(this.totalLength)
      },
      err => {
        console.error(err)
      })
  }




}
