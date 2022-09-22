import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidatePosition } from '../models/candidate-position.model';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/candidatePositions'

@Injectable({
  providedIn: 'root'
})
export class CandidatePositionService {

  constructor(private http: HttpClient) { }

  getAllCandidatesJson(): Observable<CandidatePosition[]> {
    return this.http.get<CandidatePosition[]>(baseUrl, {responseType: 'json'});
  }

  getAll(): Observable<CandidatePosition[]> {
    return this.http.get<CandidatePosition[]>(baseUrl);
  }

  deleteById(id:any): Observable<any> {
    return this.http.delete(baseUrl + '/' + id);
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
