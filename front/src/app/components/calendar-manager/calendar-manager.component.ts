import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {Entretien} from "../../_services/entretien";
import {ActivatedRoute, Router} from "@angular/router";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import {EntretienService} from "../../_services/entretien.service";
import {DossierService} from "../../_services/dossier.service";
import {DataService} from "../../_services/data.service";
import {StorageService} from "../../_services/storage.service";

@Component({
  selector: 'calendar-manager-component',
  templateUrl: './calendar-manager.component.html',
  styleUrls: ['./calendar-manager.component.css']
})
export class CalendarManagerComponent implements AfterViewInit {
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
    viewType: "Week",
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt("Ajouter un evenement:", "Event 1");
      const dp = args.control;
      dp.clearSelection();
      if (!modal.result) {
        return;
      }
      let event = new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result,
      })
      dp.events.add(event);
      this.entretien = new Entretien(this.dossier.idDossier, event.data);
    }

  };
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
    this.id = this.route.snapshot.params['id'];
    this.dossierService.getDossierByManager(this.id).subscribe(data => {
      data.map((d: { entretiens: any; }) => d.entretiens).forEach(
        (p: any) => this.entretiens = this.entretiens.concat(p)
      );
    });
    ;
  }

  private loadEntretiens() {
    this.entretiens.forEach((d: { dateDebut: any; dateFin: any; text: any; }) => {
      let event = new DayPilot.Event({
        start: d.dateDebut,
        end: d.dateFin,
        id: DayPilot.guid(),
        text: d.text,
      });
      this.events.push(event.data)
    });
  }
}

