import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  constructor(private storageService: StorageService) { }
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();

  }

  check = function(role : number) : string {
    if (role==1) { return 'Manager' }
    else if (role==2) { return "Ressources Huamines" }
    else if (role==3) { return "Admin" }
    else { return "ERR" }
  }


}
