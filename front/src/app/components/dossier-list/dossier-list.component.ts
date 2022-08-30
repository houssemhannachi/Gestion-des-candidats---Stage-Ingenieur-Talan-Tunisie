import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {DossierService} from "../../_services/dossier.service";
import Swal from "sweetalert2";
import Utils from "../../_utils/utils";

@Component({
  selector: 'app-dossier-list',
  templateUrl: './dossier-list.component.html',
  styleUrls: ['./dossier-list.component.css']
})
export class DossierListComponent implements OnInit {

  dossiers: any;
  p: number = 1;
  searchValue!: String;
  searchState!:String;
  totalLength: any;
  key: String = 'intitule';
  reverse: boolean = false;
  ent: any = [];
  state: any = [];
  utils = new Utils();
  statut!:String;
  

  constructor(private DossierService: DossierService, private router: Router) {

  }

  ngOnInit(): void {
    this.getdossier();
  }

  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  create() {
    this.router.navigate(['add-dossier']);
  }

  dossierDetails(id: number) {
    this.router.navigate(['dossier-details', id]);
  }

  update(id: number) {
    this.router.navigate(['update-dossier', id]);
  }

  delete(id: number) {
    this.DossierService.delete(id)
      .pipe(first())
      .subscribe(
        success => console.log('candidat supprimé'),
        error2 => console.error(' suppression du candidat annulé')
      );
  }

  open(id: number) {
    Swal.fire({
      title: 'Supprimer',
      text: 'Voulez-vous supprimer ce dossier?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      confirmButtonColor: '#006400',
      cancelButtonText: 'Annuler',
      cancelButtonColor: '#8B0000'

    }).then((result) => {
      if (result.value) {
        this.delete(id);

        Swal.fire({
            title: 'Supprimé!',
            text: 'Ce dossier a été supprimé.',
            icon: 'success',
            confirmButtonColor: '#435D7D',
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          }
        )
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  exportpdf(): void {
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

  getValues() {
    console.log(this.statut)
  }

  private getdossier() {
    this.DossierService.getList().subscribe(data => {
      this.dossiers = data;
      this.totalLength = data.length
      this.dossiers.forEach(
        (d: any) => {
          d.etat = [];
          d.entretiens.forEach(
            (e: any) => {
              d.etat = d.etat.concat(e.state)

            }
          )
        }
      )
      ;
    })


  }
}

