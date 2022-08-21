import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import {DossierCandidature} from "../../_services/dossier.candidature";
import {DossierService} from "../../_services/dossier.service";

@Component({
  selector: 'app-update-dossier',
  templateUrl: './update-dossier.component.html',
  styleUrls: ['./update-dossier.component.css']
})
export class UpdateDossierComponent implements OnInit {


  id: any;
  dossier: DossierCandidature = new DossierCandidature();
  constructor(private DossierService: DossierService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.DossierService.getDossierById(this.id).subscribe(data => {
      this.dossier = data;
    }, error => console.log(error));
  }

  onSubmit(){
    this.DossierService.update(this.id, this.dossier).subscribe( data =>{
      this.goToList();
    }
    , error => console.log(error));
  }

  goToList(){
    this.router.navigate(['/dossier']);
  }
}
