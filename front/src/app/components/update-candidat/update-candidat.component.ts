import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {Candidat} from "../../_services/candidat";
import {CandidatService} from "../../_services/candidat.service";


@Component({
  selector: 'app-update-candidat',
  templateUrl: './update-candidat.component.html',
  styleUrls: ['./update-candidat.component.css']
})
export class UpdateCandidatComponent implements OnInit {


  id: any;
  candidat: Candidat = new Candidat();
  constructor(private CandidatService: CandidatService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.CandidatService.getCandidatById(this.id).subscribe(data => {
      this.candidat = data;
    }, error => console.log(error));
  }

  onSubmit(){
    this.CandidatService.update(this.id, this.candidat).subscribe( data =>{
      this.goToList();
    }
    , error => console.log(error));
  }

  goToList(){
    this.router.navigate(['/candidats']);
  }
}
