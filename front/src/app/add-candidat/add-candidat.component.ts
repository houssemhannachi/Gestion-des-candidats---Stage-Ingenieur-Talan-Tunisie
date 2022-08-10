import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {Candidat} from "../_services/candidat";
import {CandidatService} from "../_services/candidat.service";


@Component({
  selector: 'app-add-candidat',
  templateUrl: './add-candidat.component.html',
  styleUrls: ['./add-candidat.component.css']
})
export class AddCandidatComponent implements OnInit {


  candidat: Candidat = new Candidat();


  constructor( private candidatService: CandidatService,private router: Router) { }

  ngOnInit(): void {
  }

  save(){
    this.candidatService.create(this.candidat).subscribe( data =>{
      console.log(data);
      this.goToList();
    },
    error => console.log(error));
  }


  goToList(){
    this.router.navigate(['/candidats']);
  }

  onSubmit(){
    console.log(this.candidat);
    this.save();
  }




  setCv($event: any) {
    this.candidat.fileDB={};
    this.candidat.fileDB.id=$event;
  }
}








