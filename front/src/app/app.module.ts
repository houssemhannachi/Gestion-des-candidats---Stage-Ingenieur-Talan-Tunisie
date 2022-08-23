import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
//import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {BoardAdminComponent} from './components/board-admin/board-admin.component';
import {BoardRhComponent} from './components/board-rh/board-rh.component';
import {BoardManagerComponent} from './components/board-manager/board-manager.component';
import {httpInterceptorProviders} from './_helpers/http.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgToastModule} from "ng-angular-popup";
import {AddCandidatComponent} from './components/add-candidat/add-candidat.component';
import {AddDossierComponent} from './components/add-dossier/add-dossier.component';
import {CandidatDetailsComponent} from './components/candidat-details/candidat-details.component';
import {CandidatListComponent} from './components/candidat-list/candidat-list.component';
import {DossierDetailsComponent} from './components/dossier-details/dossier-details.component';
import {DossierListComponent} from './components/dossier-list/dossier-list.component';
import {UpdateCandidatComponent} from './components/update-candidat/update-candidat.component';
import {UpdateDossierComponent} from './components/update-dossier/update-dossier.component';
import {CandidatService} from "./_services/candidat.service";
import {CalendarModule} from './components/calendar/calendar.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ManagerListComponent } from './components/manager-list/manager-list.component';
import { AddCalendarComponent } from './components/add-calendar/add-calendar.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { SearchfilterPipe } from './searchfilter.pipe';
import { SearchPipe } from './search.pipe';
import { EntretienComponent } from './components/entretien/entretien.component';
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import { DossierCandidatureListComponent } from './components/dossier-candidature-list/dossier-candidature-list.component';
import { EntretienListComponent } from './components/entretien-list/entretien-list.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';



FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

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
    ManagerListComponent,
    AddCalendarComponent,
    FileUploadComponent,
    SearchfilterPipe,
    SearchPipe,
    EntretienComponent,
    DossierCandidatureListComponent,
    EntretienListComponent,
    ImageUploadComponent
   ],
    imports: [
        BrowserModule,
        AppRoutingModule,

        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule,
        FullCalendarModule,
        NgToastModule,
        CalendarModule,
        //Ng2SearchPipeModule,
        Ng2OrderModule,
        DayPilotModule


    ],
  providers: [
    CandidatService,
    httpInterceptorProviders],
  bootstrap: [AppComponent],

})
export class AppModule {
}
