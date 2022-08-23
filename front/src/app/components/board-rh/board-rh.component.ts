import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {CandidatService} from '../../_services/candidat.service';
import {DossierService} from "../../_services/dossier.service";


@Component({
  selector: 'app-board-rh',
  templateUrl: './board-rh.component.html',
  styleUrls: ['./board-rh.component.css']
})
export class BoardRhComponent implements OnInit {
  content?: string;
  public count!: number;
  countCandidats: any;
  countManagers: any;
  countDossiers: any;
  private totalLength: number | undefined;

  constructor(private userService: UserService, private candidatService: CandidatService, private dossierService: DossierService) {
  }

  ngOnInit(): void {
    this.userService.getRhBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
    this.counterCandidats();
    this.counterDossiers();
    this.counterManagers()
  }

  counterCandidats() {
    this.candidatService.countCandidats().subscribe(data => {
      this.countCandidats = data;
    });
  }

  counterDossiers() {
    this.dossierService.countDossiers().subscribe(data => {
      this.countDossiers = data;
    });
  }

  counterManagers() {
    this.userService.getUsersByRole("ROLE_MANAGER")
      .subscribe(data => {
        this.countManagers = data.length;
      });

  }


}
