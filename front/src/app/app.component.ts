import {Component} from '@angular/core';
import {StorageService} from './_services/storage.service';
import {AuthService} from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  showRhBoard = false;
  showManagerBoard = false;
  name?: string;
  title: string = '';
  private role: string | undefined;

  constructor(private storageService: StorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = user.role;

      this.showAdminBoard = this.role === 'ROLE_ADMIN';
      this.showRhBoard = this.role === 'ROLE_RH';
      this.showManagerBoard = this.role === 'ROLE_MANAGER'
      this.name = user.name;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
      },
      error: err => {
        console.log(err);
      }
    });

    window.location.reload();
  }
}
