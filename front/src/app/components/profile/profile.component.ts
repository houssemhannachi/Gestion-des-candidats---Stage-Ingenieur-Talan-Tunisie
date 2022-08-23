import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();

  }

  check = function (role: string): string {
    if (role == "ROLE_MANAGER") {
      return 'Manager'
    } else if (role == "ROLE_RH") {
      return "Ressources Huamines"
    } else if (role == "ROLE_ADMIN") {
      return "Admin"
    } else {
      return "ERR"
    }
  }


}
