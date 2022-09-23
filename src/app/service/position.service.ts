import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';

const baseUrl = 'https://team3-c6-project.herokuapp.com/api/positions'

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  /**
   * Constructor with HttpClient class
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Get all positions
   * @returns
   */
  getAll(): Observable<Position[]>{
    return this.http.get<Position[]>(baseUrl);
  }

  /**
   * Get positions by title, as parameter
   * @param title
   * @returns
   */
  getByTitle(title: any): Observable<Position[]>{
    return this.http.get<Position[]>(baseUrl + '/' + 'title' + '/' + title);
  }

  /**
   * Create position with data in parameters
   * @param data
   * @returns
   */
  createPosition(data:any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  /**
   * Delete position by id
   * @param id
   * @returns
   */
  deletePosition(id:any): Observable<any> {
    return this.http.delete(baseUrl + '/' + id);
  }
}
