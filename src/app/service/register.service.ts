import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  register(name: any, surname: any, username: any, password: any): Observable<any> {
    let enabled: boolean = true
    let roles: any = [
      {
        "id": 11,
        "name": "USER"
      }
    ]
    return this.httpClient
      .post<any>("http://localhost:8080/register", { name, surname, username, password, enabled, roles });
  }
}
