import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill.model';

// Skills url api
const baseUrlSkills = 'https://team3-c6-project.herokuapp.com/api/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  /**
   * HttpClient class
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Get all skills
   * @returns
   */
  getAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(baseUrlSkills);
  }

  /**
   * Get skill by id
   * @param id
   * @returns
   */
  get(id:any): Observable<Skill> {
    return this.http.get(baseUrlSkills + '/' + id);
  }

  /**
   * Add skill, with name as parameter
   * @param name
   * @returns
   */
  add(name: any): Observable<any> {
    return this.http
      .post<any>(baseUrlSkills, { name });
  }

  /**
   * Update skill by id, with id and data as parameters
   * @param id
   * @param data
   * @returns
   */
  update(id:any, data:any): Observable<any> {
    return this.http.put(baseUrlSkills + '/' + id, data);
  }

  /**
   * Delete skill by id
   * @param id
   * @returns
   */
  delete(id:any): Observable<any> {
    return this.http.delete(baseUrlSkills + '/' + id);
  }
}
