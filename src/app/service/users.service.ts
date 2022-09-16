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

  delete(id:any): Observable<any> {
    return this.http.delete(baseUrl + '/' + id);
  }
}
