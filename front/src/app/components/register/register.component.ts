import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    name: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,private toast:NgToastService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { name, email, password } = this.form;

    this.authService.register(name, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toast.success({detail:'Votre inscription a été réussi!',summary:"",duration:5000})

      },
      error: err => {
        this.toast.warning({detail:'Inscription a échoué',summary:"Cet adresse courriel est déjà utilisé.",duration:5000})
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
