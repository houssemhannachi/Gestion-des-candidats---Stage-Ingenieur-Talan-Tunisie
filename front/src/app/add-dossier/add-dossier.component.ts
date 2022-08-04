import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DossierCandidature} from "../_services/DossierCandidature";
import {DossierService} from "../_services/dossier.service";




@Component({
  selector: 'app-add-dossier',
  templateUrl: './add-dossier.component.html',
  styleUrls: ['./add-dossier.component.css']
})
export class AddDossierComponent implements OnInit {


    dossier: DossierCandidature = new DossierCandidature();
    dossiers: any;
    
  
  
    constructor( private DossierService: DossierService,private router: Router) { }

    ngOnInit(): void {
    }

    
    save(){
      this.DossierService.create(this.dossier).subscribe( data =>{
        console.log(data);
        this.goToList();
      },
      error => console.log(error));
    }

    goToList(){
      this.router.navigate(['/dossier']);
    }

    onSubmit(){
      console.log(this.dossier);
      this.save();
    }
  }



