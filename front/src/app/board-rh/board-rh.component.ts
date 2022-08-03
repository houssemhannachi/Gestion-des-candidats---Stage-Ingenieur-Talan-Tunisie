import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {AppRoutingModule} from "../app-routing.module";
import {AppComponent} from "../app.component";


@Component({
  selector: 'app-board-rh',
  templateUrl: './board-rh.component.html',
  styleUrls: ['./board-rh.component.css']
})
export class BoardRhComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) { }

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
