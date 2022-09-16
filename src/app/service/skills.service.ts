import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill.model';

const baseUrlSkills = 'https://team3-c6-project.herokuapp.com/api/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Skill[]> {
    console.log(this.http.get<Skill[]>(baseUrlSkills))
    return this.http.get<Skill[]>(baseUrlSkills);
  }

  get(id:any): Observable<Skill> {
    return this.http.get(baseUrlSkills + '/' + id);
  }

  add(name: any) {
    return this.http
      .post<any>(baseUrlSkills, { name });
  }

  update(id:any, data:any): Observable<any> {
    return this.http.put(baseUrlSkills + '/' + id, data);
  }

  delete(id:any): Observable<any> {
    return this.http.delete(baseUrlSkills + '/' + id);
  }
}
