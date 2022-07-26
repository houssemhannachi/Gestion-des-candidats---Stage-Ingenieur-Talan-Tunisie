import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
import {DossierCandidature} from './dossier.candidature';
import {Email} from "../_entities/email";

@Injectable({
  providedIn: 'root'
})
export class DossierService {


  constructor(private httpClient: HttpClient) {
  }

  getList(): Observable<DossierCandidature[]> {
    return this.httpClient.get<DossierCandidature[]>(`/server/api/dossier/getAllDossiers`);
  }

  create(dossier: DossierCandidature): Observable<Object> {
    return this.httpClient.post(`/server/api/dossier/AddDossier`, dossier);
  }

  getDossierById(id: number | undefined): Observable<DossierCandidature> {
    return this.httpClient.get<DossierCandidature>(`/server/api/dossier/getdossier/${id}`);
  }

  update(id: number | undefined, dossier: DossierCandidature): Observable<Object> {
    return this.httpClient.put(`/server/api/dossier/update/${id}`, dossier);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`/server/api/dossier/deleteDossier/${id}`);
  }

  countDossiers() {
    return this.httpClient.get(`/server/api/dossier/count`);
  }

  getDossierByManager(id: any): Observable<any> {
    return this.httpClient.get(`/server/api/dossier/getDossierByManager/${id}`);
  }

  updateState(id: number | undefined, dossier: DossierCandidature): Observable<Object> {
    return this.httpClient.put(`/server/api/dossier/updateState/${id}`, dossier);
  }
  mail(email:Email): Observable<any> {
    return this.httpClient.post('server/api/sendMail',email);
  }

  getDossierByCandidat(id: any): Observable<any> {
    return this.httpClient.get(`/server/api/dossier/getDossierByCandidat/${id}`);
  }
}
