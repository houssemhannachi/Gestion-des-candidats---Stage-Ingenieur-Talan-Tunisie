import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {StorageService} from "../_services/storage.service";
import {DossierService} from "../_services/dossier.service";
import {DossierCandidature} from "../_services/dossier.candidature";
import {EntretienService} from "../_services/entretien.service";

@Component({
  selector: 'app-board-manager',
  templateUrl: './board-manager.component.html',
  styleUrls: ['./board-manager.component.css']
})
export class BoardManagerComponent implements OnInit {
  content?: string;
  currentUser?: any;
  entretiens?:any;
  totalLength: any;
  constructor(private userService: UserService,
              private storageService: StorageService,
              private dossierService:DossierService,
              private entretienService:EntretienService) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.dossierService.getDossierByManager(this.currentUser.id).subscribe(data => {
        this.totalLength=data.length
      },
      err => {
        console.error(err)
      })

    this.userService.getManagerBoard().subscribe({
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
  }

}
