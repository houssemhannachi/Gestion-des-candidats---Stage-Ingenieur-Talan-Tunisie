import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {BoardRhComponent} from './components/board-rh/board-rh.component';
import {BoardAdminComponent} from './components/board-admin/board-admin.component';
import {BoardManagerComponent} from "./components/board-manager/board-manager.component";
import {CandidatListComponent} from "./components/candidat-list/candidat-list.component";
import {UpdateCandidatComponent} from "./components/update-candidat/update-candidat.component";
import {AddCandidatComponent} from "./components/add-candidat/add-candidat.component";
import {CandidatDetailsComponent} from "./components/candidat-details/candidat-details.component";
import {DossierListComponent} from "./components/dossier-list/dossier-list.component";
import {AddDossierComponent} from "./components/add-dossier/add-dossier.component";
import {UpdateDossierComponent} from "./components/update-dossier/update-dossier.component";
import {DossierDetailsComponent} from "./components/dossier-details/dossier-details.component";
import {AddCalendarComponent} from './components/add-calendar/add-calendar.component';
import {ManagerListComponent} from "./components/manager-list/manager-list.component";
import {EntretienComponent} from "./components/entretien/entretien.component";
import {
  DossierCandidatureListComponent
} from "./components/dossier-candidature-list/dossier-candidature-list.component";
import {EntretienListComponent} from "./components/entretien-list/entretien-list.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'manager', component: BoardManagerComponent},
  {path: 'rh', component: BoardRhComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'candidats', component: CandidatListComponent},
  {path: 'add-candidat', component: AddCandidatComponent},
  {path: 'update-candidat/:id', component: UpdateCandidatComponent},
  {path: 'candidat-details/:id', component: CandidatDetailsComponent},
  {path: 'dossier', component: DossierListComponent},
  {path: 'add-dossier', component: AddDossierComponent},
  {path: 'update-dossier/:id', component: UpdateDossierComponent},
  {path: 'dossier-details/:id', component: DossierDetailsComponent},
  {path: 'calendar', component: AddCalendarComponent},
  {path: 'managerList', component: ManagerListComponent},
  {path: 'entretien/:id', component: EntretienComponent},
  {path: 'dossierCandidatureList', component: DossierCandidatureListComponent},
  {path: 'entretienList', component: EntretienListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
