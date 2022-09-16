import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'https://team3-c6-project.herokuapp.com/api/candidates';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    console.log(this.http.get<User[]>(baseUrl))
    return this.http.get<User[]>(baseUrl);
  }

  findByUsername(username:any): Observable<User> {
    return this.http.get<any>(baseUrl + '/username/' + username);
  }

  add(name: any, surname: any, username: any, password: any) {
    let enabled: boolean = true
    let roles: any = [
      {
        "id": 11,
        "name": "USER"
      }
    ]
    return this.http
      .post<any>("https://team3-c6-project.herokuapp.com/register", { name, surname, username, password, enabled, roles });
  }

  update(id:any, data:any): Observable<any> {
    return this.http.put(baseUrl + '/' + id, data);
  }

  delete(id:any): Observable<any> {
    return this.http.delete(baseUrl + '/' + id);
  }
}
