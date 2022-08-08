import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CandidatService} from "../_services/candidat.service";
import {Candidat} from "../_services/candidat";

@Component({
  selector: 'app-candidat-details',
  templateUrl: './candidat-details.component.html',
  styleUrls: ['./candidat-details.component.css']
})
export class CandidatDetailsComponent implements OnInit {

  id: number | undefined;
  candidat: any ;
  constructor(private candidatService: CandidatService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.candidat = new Candidat();
    this.candidatService.getCandidatById(this.id).subscribe(data => {
      this.candidat = data;
    });
  }
}
