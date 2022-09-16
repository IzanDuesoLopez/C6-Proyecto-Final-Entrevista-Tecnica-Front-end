import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './authentication.service';
import { Observable } from 'rxjs';

const baseUrl = 'https://team3-c6-project.herokuapp.com/api/candidates';
//const baseUrl = 'http://localhost:8080/api/candidates';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }
}
