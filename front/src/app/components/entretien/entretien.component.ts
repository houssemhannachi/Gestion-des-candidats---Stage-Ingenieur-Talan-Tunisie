import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import {DataService} from "../../_services/data.service";
import {DossierService} from "../../_services/dossier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DossierCandidature} from "../../_services/dossier.candidature";
import {EntretienService} from "../../_services/entretien.service";
import {Entretien} from "../../_entities/entretien";
import Swal from "sweetalert2";
import {StateEntretienEnum} from "../../enums/state.entretien.enum";

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.css']
})
export class EntretienComponent implements OnInit, AfterViewInit {
  id: any;
  dossier: any;
  public entretiens: any = [];
  public entretien: Entretien | undefined;
  entretienDossier: Entretien | undefined;
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
      const modal = await DayPilot.Modal.prompt("Planifier votre entretien:", "Entretien : , Salle :",{top: 180,left:390,autoFocus: false});
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
      this.entretien = new Entretien(this.dossier.idDossier, event.data,StateEntretienEnum.EN_ATTENTE);
      console.log(this.entretien)
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Supprimer",
          onClick: args => {
            const e = args.source;
            this.week.control.events.remove(e);
          }
        }
      ]
    }),
  };
  configMonth: DayPilot.MonthConfig = {};

  constructor(private ds: DataService, private dossierService: DossierService,
              private route: ActivatedRoute,
              private entretienService: EntretienService,
              private router: Router) {
    this.viewWeek();

  }

  ngOnInit(): void {
    this.getDossier();
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
    this.getEntretien();
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
    this.dossier.statut = "En_cours"
    this.dossierService.update(this.dossier.idDossier, this.dossier).subscribe(result => this.listEntretiens());
  }

  getDossier(): any {
    this.id = this.route.snapshot.params['id'];
    this.dossier = new DossierCandidature();
    this.dossierService.getDossierById(this.id).subscribe(data => {
      this.dossier = data;
      console.log(this.dossier)
    });
  }

  getEntretien() {
    this.id = this.route.snapshot.params['id'];
    this.entretienService.getEntretienByIdDossier(this.id).subscribe(data => {
      data.forEach((d: any) => {
        if(d.state!='REFUSE') {
        let event = new DayPilot.Event({
          start: d.dateDebut,
          end: d.dateFin,
          id: DayPilot.guid(),
          text: d.text,
        });

        this.events.push(event.data)}
      });
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  open() {
    Swal.fire({
      title: 'Enregistrer',
      text: 'Voulez-vous enregistrer vos modifications?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      confirmButtonColor: '#006400',
      cancelButtonText: 'Annuler',
      cancelButtonColor:'#8B0000'
    }).then((result) => {
      if (result.value) {
        this.save();
        this.sendMail();
        Swal.fire({
            title: 'Enregistré!',
            text: 'Vos modifications ont été enregistrées.',
            icon: 'success',
            confirmButtonColor: '#435D7D',
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          }

        )
        //this.sendEmailCandidat();
        //this.sendEmailManager();


      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  private listEntretiens() {
    setTimeout(() => {
      this.reloadPage();
    }, 10);
    this.router.navigate(['/dossier-details', this.dossier.idDossier]);
  }

  private sendMail () {
    let msg: string = '';
    msg = msg.concat("<h3>Bonjour ,</h3>",
      "<p><b>Le dossier de candidature est :</b></p>","<br>",
      this.dossier.intitule,
      "<br><p><b>Date proposée pour l'entretien :</b> ", this.entretien?.data.start.value,
      "<br>Selon votre disponibilité, prière d'accepter ou de refuser la date proposée.<br>",
      "<b>Cordialement.</b>",

      "<br><br><h2><span style='color:#5F9EA0'>RH Talan </h2></span><p>Talan Tunisie<br>10 rue de l'énergie solaire,<br>Impasse n°1 Cedex 2035 Charguia 1 Tunis</p>"
    )
    this.dossierService.mail({
      recipient:this.dossier.user.email,
      msgBody:msg,
      subject:"Proposition d'une date d'entretien"
    }).subscribe((result => this.listEntretiens()));

  }

}
