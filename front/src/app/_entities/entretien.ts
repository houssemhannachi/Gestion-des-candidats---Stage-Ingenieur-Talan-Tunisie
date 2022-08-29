export class Entretien {
  idDossier?: any;
  data?: any;
  state?:any;

  constructor(idDossier: any, data: any,state:any) {
    this.idDossier = idDossier;
    this.data = data;
    this.state=state;
  }
}
