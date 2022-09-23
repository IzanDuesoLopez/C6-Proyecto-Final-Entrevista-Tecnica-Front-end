import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateSkill } from '../models/candidate-skill.model';

const baseUrlCandidateSkills = 'https://team3-c6-project.herokuapp.com/api/candidateSkills';

@Injectable({
  providedIn: 'root'
})
export class CandidateSkillsService {

  /**
   * Constructor with HttpClient class
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Get all candidateSkills, usint the responseType as Json
   * @returns
   */
  getAllJson(): Observable<CandidateSkill[]> {
    return this.http.get<CandidateSkill[]>(baseUrlCandidateSkills, {responseType: 'json'});
  }

  /**
   * Get all candidateSKills
   * @returns
   */
  getAll(): Observable<CandidateSkill[]> {
    return this.http.get<CandidateSkill[]>(baseUrlCandidateSkills);
  }

  /**
   * Add candidateSkill, with data as parameter
   * @param data
   * @returns
   */
  add(data: any): Observable<any> {
    return this.http
      .post<any>(baseUrlCandidateSkills,  data );
  }

  /**
   * Update an specific candidateSkill by id, with data also as parameter
   * @param id
   * @param data
   * @returns
   */
  update(id:any, data:any): Observable<any> {
    return this.http.put(baseUrlCandidateSkills + '/' + id, data);
  }

  /**
   * Delete candidateSkill by id
   * @param id
   * @returns
   */
  delete(id:any): Observable<any> {
    return this.http.delete(baseUrlCandidateSkills + '/' + id);
  }
}
