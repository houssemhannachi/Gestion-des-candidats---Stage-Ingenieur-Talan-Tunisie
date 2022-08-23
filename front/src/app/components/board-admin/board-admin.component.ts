import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit, OnChanges {
  content?: string;
  public users: any = [];
  totalLength: any;
  page: number = 1;
  public roles = [
    {id: 1, name: 'ROLE_MANAGER', role: 'Manager'},
    {id: 2, name: 'ROLE_RH', role: 'Ressources Huamines'},
    {id: 3, name: 'ROLE_ADMIN', role: 'Admin'}]

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
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
    this.getUser();
  }

  getUser() {
    this.userService.getUser()
      .subscribe(
        data => {
          this.users = data;
          this.totalLength = this.users.length
        },
        err => {
          console.error(err)
        },
        () => {
          console.log(this.totalLength)
        }
      )

  }

  save() {
    this.userService.save(this.users).subscribe(result => this.gotoUserList());

  }

  check = function (role: String): number {
    if (role == "ROLE_MANAGER") {
      return 1
    } else if (role == "ROLE_RH") {
      return 2
    } else if (role == "ROLE_ADMIN") {
      return 3
    } else {
      return 0
    }
  }


  gotoUserList() {

  }

  open() {
    Swal.fire({
      title: 'Enregistrer',
      text: 'Voulez-vous enregistrer vos modifications des rôles?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      confirmButtonColor: '#435D7D',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        this.save()
        Swal.fire({
            title: 'Enregistré!',
            text: 'Vos modifications ont été enregistrées.',
            icon: 'success',
            confirmButtonColor: '#435D7D',
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }
}
