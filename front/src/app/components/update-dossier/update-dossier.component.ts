import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DossierCandidature} from "../../_services/dossier.candidature";
import {DossierService} from "../../_services/dossier.service";
import {UserService} from 'src/app/_services/user.service';
import {CandidatService} from 'src/app/_services/candidat.service';

@Component({
  selector: 'app-update-dossier',
  templateUrl: './update-dossier.component.html',
  styleUrls: ['./update-dossier.component.css']
})
export class UpdateDossierComponent implements OnInit {

  candidats: any;
  managers: any;
  candidatsLength: any;
  managersLength: any;
  id: any;
  dossier: DossierCandidature = new DossierCandidature();

  constructor(private DossierService: DossierService, private userService: UserService, private candidatService: CandidatService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.DossierService.getDossierById(this.id).subscribe(data => {
      this.dossier = data;
    }, error => console.log(error));
  }

  getCandidats(nom: string, prenom: string) {
    this.candidatService.getCandidatsByName(nom, prenom).subscribe(data => {
      this.candidats = data;
      this.candidatsLength = data.length;

    });

  }


  getManager(name: string) {
    this.userService.getUsersByNameAndRole(name, "ROLE_MANAGER")
      .subscribe(data => {
        this.managers = data;
        this.managersLength = data.length;
      });

  }

  onSubmit() {
    this.DossierService.update(this.id, this.dossier).subscribe(data => {
        this.goToList();
      }
      , error => console.log(error));
  }

  goToList() {
    this.router.navigate(['/dossier']);
  }
}
