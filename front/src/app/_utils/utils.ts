export default class Utils {
  entretiens: any = [];
  entretienAttente: string | undefined;
  test: any;
  entretienValide: string | undefined;
  etat: any;

  checkstatut(statut: string): string {
    if (statut == "En_attente") {
      return " En attente";
    } else if (statut == "En_cours") {
      return " En cours"
    } else if (statut == "Accepte") {
      return " Accepté"
    } else if (statut == "Refuse") {
      return " Refusé"
    } else {
      return ""
    }
  }

  checkstyle(statut: string): string {
    if (statut == "En_attente") {
      return "bi bi-pause-circle";
    } else if ((statut == "En_cours")) {
      return "bi bi-play"
    } else if (statut == "Accepte") {
      return "bi bi-check2-circle"
    } else if (statut == "Refuse") {
      return "bi bi-x-circle-fill"
    } else {
      return ""
    }
  }

  checkstate(dossier: any): any {

    dossier.entretiens.forEach((e: any) => {
      this.entretiens = this.entretiens.concat(e.state);
    })
    if (dossier.entretiens.length > 0) {
      this.entretienAttente = "En attente";
    }
    this.test = this.entretiens.includes('VALIDE');
    if (this.entretiens.includes('VALIDE')) {
      this.entretienValide = "Entretien planifié et validé";
    } else if (this.entretiens.includes('EN_ATTENTE')) {
      this.entretienValide = "En attente de validation de manager";
    } else {
      this.entretienValide = "En cours";
    }
    this.entretiens.forEach((e: any) => {
      if (e == 'REFUSE') {
        this.entretienAttente = "Proposition d'entretien refusé par le manager";
      } else {
        this.entretienAttente = "En attente";
      }
    })
    if (dossier.entretiens.length == 0) {
      this.entretienAttente = "Pas d'entretien planifié";
    }
  }

  check(dossier: any) {
    var etat = '';
    var style='';
    if (dossier.etat.includes('VALIDE')) {
      etat = "Entretien planifié et validé";
      style ="alert alert-success";
    } else if (dossier.etat.includes('EN_ATTENTE')) {
      etat = "En attente de validation";
      style ="alert alert-secondary";
    } else if (dossier.etat.every( (e:any)  => e=='REFUSE')) {
      etat = "Entretien refusé";
      style ="alert alert-danger";}
    if (dossier.etat.length == 0) {
      etat = "Pas d'entretien planifié";
      style ="alert alert-info";

    }

    return {etat:etat,style:style}
  }

}
