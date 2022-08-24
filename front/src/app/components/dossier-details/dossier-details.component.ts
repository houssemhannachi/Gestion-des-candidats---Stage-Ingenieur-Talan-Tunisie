import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DossierCandidature} from "../../_services/dossier.candidature";
import {DossierService} from "../../_services/dossier.service";

@Component({
  selector: 'app-dossier-details',
  templateUrl: './dossier-details.component.html',
  styleUrls: ['./dossier-details.component.css']
})
export class DossierDetailsComponent implements OnInit {

  id: number | undefined;
  dossier: any;
  entretiens: any=[];
  test: any;

  constructor(private dossierService: DossierService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.dossier = new DossierCandidature();
    this.dossierService.getDossierById(this.id).subscribe(data => {
      this.dossier = data;
      this.dossier.entretiens.forEach((e:any)=>{
        this.entretiens=this.entretiens.concat(e.state)
      })
      this.test = this.entretiens.includes('VALIDE');
    });
  }


}
