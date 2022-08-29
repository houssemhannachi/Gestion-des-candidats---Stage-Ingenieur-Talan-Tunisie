import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Candidat} from "../../_entities/candidat";
import {CandidatService} from "../../_services/candidat.service";
import {NgToastService} from "ng-angular-popup";


@Component({
  selector: 'app-add-candidat',
  templateUrl: './add-candidat.component.html',
  styleUrls: ['./add-candidat.component.css']
})
export class AddCandidatComponent implements OnInit {


  candidat: Candidat = new Candidat();
  errorMessage: any;


  constructor(private candidatService: CandidatService, private router: Router,private toast: NgToastService) {
  }

  ngOnInit(): void {
  }

  save() {
    this.candidatService.create(this.candidat).subscribe(data => {
        this.goToList();
      },
      error => {
        this.toast.error({
          detail: 'Ce candidat existe dèjà.',
          summary: "",
          duration: 5000
        })
        this.errorMessage = error.error.message;
      }
    );
  }


  goToList() {
    this.router.navigate(['/candidats']);
  }

  onSubmit() {
    this.save();
  }


  setCv($event: any) {
    this.candidat.fileDB = {};
    this.candidat.fileDB.id = $event;
  }

  setPhoto($event: any) {
    this.candidat.photo = {};
    this.candidat.photo.id = $event;
  }

}








