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
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Origin': 'http://localhost:4200'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get<any>(baseUrl + '/username/' + username);
  }
}
