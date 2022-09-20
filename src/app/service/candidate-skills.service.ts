import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateSkill } from '../models/candidate-skill.model';

const baseUrlCandidateSkills = 'https://team3-c6-project.herokuapp.com/api/candidateSkills';

@Injectable({
  providedIn: 'root'
})
export class CandidateSkillsService {

  constructor(private http: HttpClient) { }

  getAllJson(): Observable<CandidateSkill[]> {
    return this.http.get<CandidateSkill[]>(baseUrlCandidateSkills, {responseType: 'json'});
  }

  getAll(): Observable<CandidateSkill[]> {
    return this.http.get<CandidateSkill[]>(baseUrlCandidateSkills);
  }

  add(data: any): Observable<any> {
    return this.http
      .post<any>(baseUrlCandidateSkills,  data );
  }

  update(id:any, data:any): Observable<any> {
    return this.http.put(baseUrlCandidateSkills + '/' + id, data);
  }

  delete(id:any): Observable<any> {
    return this.http.delete(baseUrlCandidateSkills + '/' + id);
  }
}
