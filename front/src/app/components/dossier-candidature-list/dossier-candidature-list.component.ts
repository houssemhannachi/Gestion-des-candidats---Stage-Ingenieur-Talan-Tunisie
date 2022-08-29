import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../_services/storage.service";
import {DossierService} from "../../_services/dossier.service";
import {EntretienService} from "../../_services/entretien.service";
import {Router} from "@angular/router";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import Utils from "../../_utils/utils";

@Component({
  selector: 'app-dossier-candidature-list',
  templateUrl: './dossier-candidature-list.component.html',
  styleUrls: ['./dossier-candidature-list.component.css']
})
export class DossierCandidatureListComponent implements OnInit {
  dossier: any;
  dossiers: any;
  currentUser?: any;
  totalLength: any;
  p: number | undefined;
  fileName = 'listeDossiercandidature.xlsx';
  public entretiens: any = [];
  util = new Utils();

  constructor(private router: Router,
              private storageService: StorageService,
              private dossierService: DossierService,
              private entretienService: EntretienService,
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.dossierService.getDossierByManager(this.currentUser.id).subscribe(data => {
        this.dossiers = data;
        this.totalLength = this.dossiers.length;
      },
      err => {
        console.error(err)
      })

  }

  exportpdf(): void {
    let DATA: any = document.getElementById('table2');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('liste dossier.pdf');
    });
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('table2');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }


  reloadPage(): void {
    window.location.reload();
  }


  private listDossier() {
    setTimeout(() => {
      this.reloadPage();
    }, 0);
    this.router.navigate(['/dossierCandidatureList']);
  }
}
