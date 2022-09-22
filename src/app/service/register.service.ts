import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  /**
   * HttpClient class
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Register user, with name, surname, username and password as parameters
   * @param name
   * @param surname
   * @param username
   * @param password
   * @returns
   */
  register(name: any, surname: any, username: any, password: any): Observable<any> {
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
