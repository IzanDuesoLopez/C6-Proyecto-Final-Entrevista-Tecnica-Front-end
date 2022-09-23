import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

// API url by candidates
const baseUrl = 'https://team3-c6-project.herokuapp.com/api/candidates';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /**
   * Whe use the HttpClient
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Get all users
   * @returns
   */
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  /**
   * Find user by username
   * @param username
   * @returns
   */
  findByUsername(username:any): Observable<User> {
    return this.http.get<any>(baseUrl + '/username/' + username);
  }

  /**
   * Add user
   * @param name
   * @param surname
   * @param username
   * @param password
   * @returns
   */
  add(name: any, surname: any, username: any, password: any): Observable<any>{
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

  /**
   * Update user data
   * @param id
   * @param data
   * @returns
   */
  update(id:any, data:any): Observable<any> {
    return this.http.put(baseUrl + '/' + id, data);
  }

  /**
   * Delete user by id
   * @param id
   * @returns
   */
  delete(id:any): Observable<any> {
    return this.http.delete(baseUrl + '/' + id);
  }
}
