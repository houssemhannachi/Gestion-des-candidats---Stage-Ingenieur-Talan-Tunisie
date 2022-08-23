import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Entretien} from "./entretien";

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
}
