import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  register(name: any, surname: any, username: any, password: any) {
    let enabled: boolean = true
    let roles: any = [
      {
        "id": 11,
        "name": "USER"
      }
    ]
    return this.httpClient
      .post<any>("https://team3-c6-project.herokuapp.com/register", { name, surname, username, password, enabled, roles });
  }
}
