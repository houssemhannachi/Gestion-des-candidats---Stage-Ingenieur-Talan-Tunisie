import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs';
import {Candidat} from './candidat';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
}

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private httpClient: HttpClient) {
  }

  getList(): Observable<Candidat[]> {
    return this.httpClient.get<Candidat[]>("/server/api/candidat/getAllcandidat");
  }

  create(candidat: Candidat): Observable<any> {
    return this.httpClient.post('/server/api/candidat/Addcandidat', candidat, httpOptions);
  }

  getCandidatById(id: number | undefined): Observable<Candidat> {
    return this.httpClient.get<Candidat>(`/server/api/candidat/getcandidat/${id}`);
  }

  update(id: number | undefined, candidat: Candidat): Observable<Object> {
    return this.httpClient.put(`/server/api/candidat/update/${id}`, candidat);

  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`/server/api/candidat/deleteCandidat/${id}`);
  }


  countCandidats() {
    return this.httpClient.get(`/server/api/candidat/count`);
  }

  getCandidatsByName(nom: string, prenom: string): Observable<any> {
    return this.httpClient.get(`server/api/candidat/candidat-by-name/${nom}/${prenom}`);
  }

}
