import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  showPassword: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,private storageService: StorageService, private toast:NgToastService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({

      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        setTimeout( () => {
          this.reloadPage();
        }, 1400);
        this.toast.success({detail:"Connecté avec succès",summary:"Bienvenue.",duration:5000});


      },
      error: err => {
        this.toast.error({detail:'Veuillez vérifier votre adresse électronique et votre mot de passe.',summary:"",duration:5000})
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });

  }

  reloadPage(): void{
    window.location.reload();
  }
}
