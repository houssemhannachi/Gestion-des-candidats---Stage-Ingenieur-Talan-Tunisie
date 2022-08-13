import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
//import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
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
import {CandidatService} from "./_services/candidat.service";
import {CalendarModule} from './calendar/calendar.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { AddCalendarComponent } from './add-calendar/add-calendar.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';



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
    FileUploadComponent
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
    Ng2OrderModule



  ],
  providers: [
    CandidatService,
    httpInterceptorProviders],
  bootstrap: [AppComponent],

})
export class AppModule {
}
