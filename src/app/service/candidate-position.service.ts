import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidatePosition } from '../models/candidate-position.model';
import { Observable } from 'rxjs';

const baseUrl = 'https://team3-c6-project.herokuapp.com/api/candidatePositions'

@Injectable({
  providedIn: 'root'
})
export class CandidatePositionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<CandidatePosition[]> {
    return this.http.get<CandidatePosition[]>(baseUrl);
  }

  getById(id: any): Observable<CandidatePosition> {
    return this.http.get(baseUrl + '/' + id);
  }

  createCandidatePosition(data:any): Observable<any>{
    return this.http.post(baseUrl, data);
  }

  updateCandidatePosition(id:any, data:any): Observable<any> {
    return this.http.put(baseUrl + '/' + id, data);
  }

}
