import { Component, OnInit } from '@angular/core';
import { CandidatePosition } from '../models/candidate-position.model';
import { User } from '../../app/models/user.model';
import { CandidatePositionService } from '../service/candidate-position.service';
import { CandidateSkill } from '../models/candidate-skill.model';
import { CandidateSkillsService } from '../service/candidate-skills.service';
import { Skill } from '../models/skill.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-candidates-profile',
  templateUrl: './candidates-profile.component.html',
  styleUrls: ['./candidates-profile.component.css']
})
export class CandidatesProfileComponent implements OnInit {

  /**
   * Class constructor that instanciates the following objects
   * @param candidatePositionService
   * @param candidateSkillService
   */
  constructor(
    private candidatePositionService: CandidatePositionService,
    private candidateSkillService: CandidateSkillsService,
    private datePipe: DatePipe
  ) { }

  // Class variables
  skills_completas?: Skill[];
  skillCandidates?: CandidateSkill[];
  skillCandidatesFinales?: CandidateSkill[];
  currentSkill: CandidateSkill = {};

  nom_usuario_temp: any;
  // candidatePositions?: CandidatePosition[];
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

  search_positions = '';

  // Checks
  mostrar_posiciones_usuario: any;
  mostrar_skills:any;

  /**
   * Method that runs when the candidates-profile components is instanciated. We call
   * getCandidatePositions() method, tha retrieves the candidates positions.
   * Also we call the getCandidateSkills(), that retrieves the candidateSkills in real time run.
   */
  ngOnInit(): void {
    this.getCandidatePositions();
    this.getCandidateSkills();
  }

  /**
   * Method that retrieves the candidate skills by the user
   * that is logged in the web application
   */
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

  /**
   * Method that retrieves the candidate positions by the user
   * who is logged in the web application
   */
  getCandidatePositions(): void {
    let j = 0; // Contador

    this.usuario.username = sessionStorage.getItem("username");

    this.candidatePositionService.getAllCandidatesJson().subscribe(
      data => {
        // this.candidatePositions = data;
        // this.candidatePositionsFinales = data;

        // for (let i = 0; i < this.candidatePositions.length; i++) {
        //   if (this.usuario.username == this.candidatePositions[i].candidate.username) {
        //     this.candidatePositionsFinales[j] = this.candidatePositions[i];
        //     this.candidatePositionsFinales[j].test_date = this.candidatePositionsFinales[j].test_date.substring(0, 10) + ' ' + this.candidatePositionsFinales[j].test_date.substring(11, 16)
        //     j++;
        //   }
        // }

        // this.candidatePositionsFinales.length = j;
        //console.log(this.candidatePositionsFinales)

        this.candidatePositionsFinales = data
        let candidatePositionsAux:any = []

        for (let i = 0; i < this.candidatePositionsFinales.length; i++){
          this.candidatePositionsFinales[j].test_date = this.candidatePositionsFinales[j].test_date.substring(0, 10) + ' ' + this.candidatePositionsFinales[j].test_date.substring(11, 16)
          candidatePositionsAux.push(this.candidatePositionsFinales[i])
        }

        this.candidatePositionsFinales = candidatePositionsAux
      },
      error => {
        console.log(error);
      }
    )
  }

  /**
   * Method to delete a specific job position by an specific id
   * @param id
   */
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
