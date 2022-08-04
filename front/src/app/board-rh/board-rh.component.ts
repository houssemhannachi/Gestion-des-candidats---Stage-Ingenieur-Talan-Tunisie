import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import {AppRoutingModule} from "../app-routing.module";
import {AppComponent} from "../app.component";
import { CandidatService } from '../_services/candidat.service';


@Component({
  selector: 'app-board-rh',
  templateUrl: './board-rh.component.html',
  styleUrls: ['./board-rh.component.css']
})
export class BoardRhComponent implements OnInit {
  content?: string;
  @Input() public count!: number;

  constructor(private userService: UserService,private candidatService: CandidatService,) { }

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
  }
  
  
}
