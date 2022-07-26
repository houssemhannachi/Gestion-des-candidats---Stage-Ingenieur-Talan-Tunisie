import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import {DataService} from "../../_services/data.service";
import {Entretien} from "../../_entities/entretien";
import {DossierService} from "../../_services/dossier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EntretienService} from "../../_services/entretien.service";
import {StorageService} from "../../_services/storage.service";

@Component({
  selector: 'calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit {
  id: any;
  dossier: any;
  public entretiens: any = [];
  public entretien: Entretien | undefined;
  entretienDossier: Entretien | undefined;
  currentUser: any;
  dossiers: any;
  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;
  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;
  events: DayPilot.EventData[] = [];
  date = DayPilot.Date.today();
  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 1,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: args => {
      this.loadEvents();
    }
  };
  configDay: DayPilot.CalendarConfig = {};
  configWeek: DayPilot.CalendarConfig = {
    viewType: "Week"};
  configMonth: DayPilot.MonthConfig = {};

  constructor(private ds: DataService, private dossierService: DossierService,
              private route: ActivatedRoute,
              private entretienService: EntretienService,
              private router: Router,
              private storageService: StorageService) {
    this.viewWeek();

  }

  ngOnInit(): void {
    this.getEntretien();
  }

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;

  }

  ngAfterViewInit(): void {
    this.loadEntretiens()
  }

  loadEvents(): void {
    const from = this.nav.control.visibleStart();
    const to = this.nav.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

  viewDay(): void {
    this.configNavigator.selectMode = "Day";
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek(): void {
    this.configNavigator.selectMode = "Week";
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth(): void {
    this.configNavigator.selectMode = "Month";
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }

  private getDossier() {

  }

  private getEntretien() {
    this.currentUser = this.storageService.getUser();
    this.dossierService.getDossierByManager(this.currentUser.id).subscribe(data => {
      this.dossiers = data;

      this.dossiers.map((d: { entretiens: any; }) => d.entretiens).forEach(
        (p: any) => this.entretiens = this.entretiens.concat(p)
      );
    })
  }

  private loadEntretiens() {
    this.entretiens.forEach((d: any) => {
      if(d.state=='VALIDE') {
      let event = new DayPilot.Event({
        start: d.dateDebut,
        end: d.dateFin,
        id: DayPilot.guid(),
        text: d.text,
      });
      this.events.push(event.data)}
    });
  }
}

