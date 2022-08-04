import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', {responseType: 'text'});
  }

  getManagerBoard(): Observable<any> {
    return this.http.get(API_URL + 'manager', {responseType: 'text'});
  }

  getRhBoard(): Observable<any> {
    return this.http.get(API_URL + 'rh', {responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', {responseType: 'text'});
  }

  getUsersByNameAndRole(name: string, role: string) : Observable<any> {
    return this.http.get(API_URL + `admin/user/user-by-name-and-role/${name}/${role}`);
  }

  getUser() {
    return this.http.get(API_URL + 'admin/user')
  }

  save(users: any): Observable<any> {
    return this.http.post('/server/api/test/admin/user', users, httpOptions)
  }

}
