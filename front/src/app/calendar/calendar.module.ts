import {DataService} from "./data.service";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {CalendarComponent} from "./calendar.component";
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DayPilotModule
  ],
  declarations: [
    CalendarComponent
  ],
  exports:      [ CalendarComponent ],
  providers:    [ DataService ]
})
export class CalendarModule { }
