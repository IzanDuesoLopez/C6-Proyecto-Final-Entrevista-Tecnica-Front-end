import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';

const baseUrl = 'http://localhost:8080/api/positions'

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Position[]>{
    return this.http.get<Position[]>(baseUrl);
  }

  getByTitle(title: any): Observable<Position[]>{
    return this.http.get<Position[]>(baseUrl + '/' + 'title' + '/' + title);
  }

  createPosition(data:any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  deletePosition(id:any): Observable<any> {
    return this.http.delete(baseUrl + '/' + id);
  }
}
