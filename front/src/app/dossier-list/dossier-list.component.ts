import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {DossierCandidature} from "../_services/dossier.candidature";
import {DossierService} from "../_services/dossier.service";

@Component({
  selector: 'app-dossier-list',
  templateUrl: './dossier-list.component.html',
  styleUrls: ['./dossier-list.component.css']
})
export class DossierListComponent implements OnInit {

  dossiers: any;
  p:number=1;
  DateValidation:Date=new Date();
  DateCreation :Date=new Date();
  constructor(private DossierService: DossierService,private router: Router) { }

  ngOnInit(): void {
    this.getdossier();
  }

  key:string='titre';
  reverse:boolean=false;
  sort(key:string){
  this.key=key;
  this.reverse=!this.reverse;
}
  private getdossier(){
    this.DossierService.getList().subscribe(data => {
      this.dossiers = data;
      console.log(data);
        });
  }

  create(){
    this.router.navigate(['add-dossier']);
  }
  dossierDetails(id: number){
    this.router.navigate(['dossier-details', id]);
  }

  update(id: number){
    this.router.navigate(['update-dossier', id]);
  }

  delete(id: number){

    if (confirm(`Voulez-vous supprimer le dossier #${id}`)) {
      this.DossierService.delete(id)
        .pipe(first())
        .subscribe(
          success => console.log('dossier supprimé'),
          error2 => console.error(' suppression du dossier annulé')

        );
    }
    this.getdossier();
  }

  exportpdf():void{
    let DATA: any = document.getElementById('table');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('liste candidat.pdf');
    });
  }




}

