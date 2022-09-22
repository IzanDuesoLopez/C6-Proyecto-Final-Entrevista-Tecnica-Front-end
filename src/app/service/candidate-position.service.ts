import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidatePosition } from '../models/candidate-position.model';
import { Observable } from 'rxjs';

const baseUrl = 'https://team3-c6-project.herokuapp.com/api/candidatePositions'

@Injectable({
  providedIn: 'root'
})
export class CandidatePositionService {

  /**
   * Constructor with HttpClient class
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Get all candidatesPosition as Json
   * @returns
   */
  getAllCandidatesJson(): Observable<CandidatePosition[]> {
    return this.http.get<CandidatePosition[]>(baseUrl, {responseType: 'json'});
  }

  /**
   * Get all candidatePositions
   * @returns
   */
  getAll(): Observable<CandidatePosition[]> {
    return this.http.get<CandidatePosition[]>(baseUrl);
  }

  /**
   * Delete candidatePosition by id
   * @param id
   * @returns
   */
  deleteById(id:any): Observable<any> {
    return this.http.delete(baseUrl + '/' + id);
  }

  /**
   * Get candidate position by id
   * @param id
   * @returns
   */
  getById(id: any): Observable<CandidatePosition> {
    return this.http.get(baseUrl + '/' + id);
  }

  /**
   * Create candidatePosition with data as parameter
   * @param data
   * @returns
   */
  createCandidatePosition(data:any): Observable<any>{
    return this.http.post(baseUrl, data);
  }

  /**
   * Update an specific candidatePosition with id and data as parameters
   * @param id
   * @param data
   * @returns
   */
  updateCandidatePosition(id:any, data:any): Observable<any> {
    return this.http.put(baseUrl + '/' + id, data);
  }

}
