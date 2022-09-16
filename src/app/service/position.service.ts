import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';

const baseUrl = 'https://team3-c6-project.herokuapp.com/api/positions'

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Position[]>{
    return this.http.get<Position[]>(baseUrl);
  }

  getByTitle(title: any): Observable<Position[]>{
    return this.http.get<Position[]>(baseUrl + "/" + title);
  }
}
