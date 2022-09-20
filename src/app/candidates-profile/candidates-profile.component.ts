import { Component, OnInit } from '@angular/core';
import { CandidatePosition } from '../models/candidate-position.model';
import { User } from '../../app/models/user.model';
import { CandidatePositionService } from '../service/candidate-position.service';
import { CandidateSkill } from '../models/candidate-skill.model';
import { CandidateSkillsService } from '../service/candidate-skills.service';
import { Skill } from '../models/skill.model';

@Component({
  selector: 'app-candidates-profile',
  templateUrl: './candidates-profile.component.html',
  styleUrls: ['./candidates-profile.component.css']
})
export class CandidatesProfileComponent implements OnInit {

  constructor(private candidatePositionService: CandidatePositionService,
    private candidateSkillService: CandidateSkillsService) { }

  search_positions: any;

  skills_completas?: Skill[];
  skillCandidates?: CandidateSkill[];
  skillCandidatesFinales?: CandidateSkill[];
  currentSkill: CandidateSkill = {};

  nom_usuario_temp: any;
  candidatePositions?: CandidatePosition[];
  candidatePositionsFinales?: CandidatePosition[];
  currentPosition: CandidatePosition = {};

  usuario: User = {};

  registry_date = new Date()
  test_date = new Date()
  completion_date = new Date()
  result = 10
  candidate = ''
  position = ''

  id_temp: any;

  // Comprobaciones
  mostrar_posiciones_usuario: any;
  mostrar_skills:any;

  ngOnInit(): void {
    this.getCandidatePositions();
    this.getCandidateSkills();
  }

  getCandidateSkills(): void {
    let j = 0; // Contador

    this.usuario.username = sessionStorage.getItem("username");

    this.candidateSkillService.getAllJson().subscribe(
      data => {
        this.skillCandidates = data;
        this.skillCandidatesFinales = data;

        for (let i = 0; i < this.skillCandidates.length; i++) {
          if (this.usuario.username == this.skillCandidates[i].candidate?.username) {
            this.skillCandidatesFinales[j] = this.skillCandidates[i];
            j++;
          }
        }
        this.skillCandidatesFinales.length = j;
        console.log(this.skillCandidatesFinales[0].skill?.name)
      },
      error => {
        console.log(error);
      }
    )
  }

  getCandidatePositions(): void {
    let j = 0; // Contador

    this.usuario.username = sessionStorage.getItem("username");

    this.candidatePositionService.getAllCandidatesJson().subscribe(
      data => {
        this.candidatePositions = data;
        this.candidatePositionsFinales = data;

        for (let i = 0; i < this.candidatePositions.length; i++) {
          if (this.usuario.username == this.candidatePositions[i].candidate.username) {
            this.candidatePositionsFinales[j] = this.candidatePositions[i];
            j++;
          }
        }

        this.candidatePositionsFinales.length = j;
        //console.log(this.candidatePositionsFinales)
      },
      error => {
        console.log(error);
      }
    )
  }

  deletePorId(id: any): void {
    if (confirm("¿Seguro que quieres desapuntarte de la candidatura?")) {
      this.candidatePositionService.deleteById(id).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      )
    }
  }

}
