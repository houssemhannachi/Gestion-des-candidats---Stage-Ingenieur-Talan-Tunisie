import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {BoardRhComponent} from './board-rh/board-rh.component';
import {BoardManagerComponent} from './board-manager/board-manager.component';
import {httpInterceptorProviders} from './_helpers/http.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgToastModule} from "ng-angular-popup";
import {AddCandidatComponent} from './add-candidat/add-candidat.component';
import {AddDossierComponent} from './add-dossier/add-dossier.component';
import {CandidatDetailsComponent} from './candidat-details/candidat-details.component';
import {CandidatListComponent} from './candidat-list/candidat-list.component';
import {DossierDetailsComponent} from './dossier-details/dossier-details.component';
import {DossierListComponent} from './dossier-list/dossier-list.component';
import {UpdateCandidatComponent} from './update-candidat/update-candidat.component';
import {UpdateDossierComponent} from './update-dossier/update-dossier.component';
import {UploadfileComponent} from './uploadfile/uploadfile.component';
import {CandidatService} from "./_services/candidat.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardRhComponent,
    BoardManagerComponent,
    CandidatListComponent,
    CandidatDetailsComponent,
    AddCandidatComponent,
    UpdateCandidatComponent,
    DossierListComponent,
    UpdateDossierComponent,
    AddDossierComponent,
    DossierDetailsComponent,
    UploadfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,

    NgToastModule],
  providers: [
    CandidatService,
    httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {
}
