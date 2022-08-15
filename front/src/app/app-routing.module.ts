import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardRhComponent } from './board-rh/board-rh.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {BoardManagerComponent} from "./board-manager/board-manager.component";
import {CandidatListComponent} from "./candidat-list/candidat-list.component";
import {UpdateCandidatComponent} from "./update-candidat/update-candidat.component";
import {AddCandidatComponent} from "./add-candidat/add-candidat.component";
import {CandidatDetailsComponent} from "./candidat-details/candidat-details.component";
import {DossierListComponent} from "./dossier-list/dossier-list.component";
import {AddDossierComponent} from "./add-dossier/add-dossier.component";
import {UpdateDossierComponent} from "./update-dossier/update-dossier.component";
import {DossierDetailsComponent} from "./dossier-details/dossier-details.component";
import { AddCalendarComponent } from './add-calendar/add-calendar.component';
import {ManagerListComponent} from "./manager-list/manager-list.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'manager', component: BoardManagerComponent  },
  { path: 'rh', component: BoardRhComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'candidats', component: CandidatListComponent},
  {path: 'add-candidat', component: AddCandidatComponent},
  {path: 'update-candidat/:id', component: UpdateCandidatComponent},
  {path: 'candidat-details/:id', component: CandidatDetailsComponent},
  {path: 'dossier', component: DossierListComponent},
  {path: 'add-dossier', component: AddDossierComponent},
  {path: 'update-dossier/:id', component: UpdateDossierComponent},
  {path: 'dossier-details/:id', component: DossierDetailsComponent},
  {path: 'calendar', component: AddCalendarComponent},
  {path:'managerList',component:ManagerListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
