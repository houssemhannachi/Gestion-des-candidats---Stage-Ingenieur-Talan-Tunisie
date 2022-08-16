import {Component, OnInit} from '@angular/core';
import {ViewChild, AfterViewInit} from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import {DataService} from "../_services/data.service";
import {DossierService} from "../_services/dossier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DossierCandidature} from "../_services/dossier.candidature";
import {EntretienService} from "../_services/entretien.service";
import {Entretien} from "../_services/entretien";

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.css']
})
export class EntretienComponent implements OnInit, AfterViewInit {
  form = [
    {
      name: 'Description',
      id: 'description',
      type: 'text',
    }
  ];
  data = {};
  id: any;
  dossier: any;
  public entretiens: any = [];
  public entretien: Entretien | undefined;
  entretienDossier: Entretien| undefined;

  ngOnInit(): void {
    this.getDossier(); this.getEntretien() }

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

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;

  }

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
              private router: Router) {
    this.viewWeek();

  }

  ngAfterViewInit(): void {
    this.loadEvents();
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


  save() {
    this.entretienService.save(this.entretien).subscribe(result => this.listEntretiens());

  }

  getDossier() :any{
    this.id = this.route.snapshot.params['id'];
    this.dossier = new DossierCandidature();
    this.dossierService.getDossierById(this.id).subscribe(data => {
      this.dossier = data;
    });
  }

  getEntretien() {
    this.id = this.route.snapshot.params['id'];
    this.entretienService.getEntretienByIdDossier(this.id).subscribe(data => {
      this.entretienDossier = data;
      console.log(data)
    });
  }



  private listEntretiens() {
    setTimeout( () => {
      this.reloadPage();
    }, 10);
    this.router.navigate(['/dossier']);
  }

  reloadPage(): void{
    window.location.reload();
  }
}
