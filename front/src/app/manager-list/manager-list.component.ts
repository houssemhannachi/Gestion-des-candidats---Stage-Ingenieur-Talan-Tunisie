import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {
  totalLength: number = 0;
  p: number = 1;
  managers: any;
  searchValue!:String;
  key : string = 'name';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllManager()
  }

  getAllManager() {
    this.userService.getUsersByRole("ROLE_MANAGER")
      .subscribe(data => {
        this.managers = data;
        this.totalLength = this.managers.length;
        console.log(this.totalLength)
      });
    ;
  }

  create() {
    this.router.navigate(['add-manager']);
  }

  exportpdf(): void {
    let DATA: any = document.getElementById('manager-table');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 20;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.text("Liste des managers", 25, 10);
      PDF.save('liste managers.pdf');
    });
  }

  managerDetails(id: number) {
    this.router.navigate(['manager-details', id]);
  }

  update(id: number) {
    this.router.navigate(['manager-candidat', id]);
  }

  delete(id: number) {
    this.userService.delete(id)
      .pipe(first())
      .subscribe(
        success => console.log('candidat supprimé'),
        error2 => console.error(' suppression du candidat annulé')
      );
  }

  open(id: number) {
    Swal.fire({
      title: 'Supprimer',
      text: 'Voulez-vous supprimer ce manager?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      confirmButtonColor: '#435D7D',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        this.delete(id);
        Swal.fire({
            title: 'Supprimé!',
            text: 'Ce manager a été supprimé.',
            icon: 'success',
            confirmButtonColor: '#435D7D',
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          }
        )
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }


}
