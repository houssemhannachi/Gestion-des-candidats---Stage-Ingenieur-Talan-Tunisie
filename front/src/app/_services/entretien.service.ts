import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Entretien} from "./entretien";
import {DossierCandidature} from "./dossier.candidature";

const API_URL = 'http://localhost:8080/api/entretien/';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
}

@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  constructor(private http: HttpClient) {
  }

  save(entretien: Entretien | undefined): Observable<any> {
    return this.http.post('/server/api/entretien/AddEntretien', entretien, httpOptions)
  }

  getEntretienByIdDossier(id: number | undefined): Observable<any> {
    return this.http.get<any>(`/server/api/entretien/getEntretien/${id}`)
  }

  updateState(id: number | undefined, entretien: Entretien): Observable<Object> {
    return this.http.put(`/server/api/entretien/updateState/${id}`, entretien);
  }

  getEntretienById(id: any|undefined):Observable<Object> {
    return this.http.get(`/server/api/entretien/getEntretienId/${id}`)
  }
}
