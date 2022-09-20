import { Component, OnInit } from '@angular/core';
import { CandidatePosition } from '../models/candidate-position.model';
import { User } from '../../app/models/user.model';
import { CandidatePositionService } from '../service/candidate-position.service';

@Component({
  selector: 'app-candidates-profile',
  templateUrl: './candidates-profile.component.html',
  styleUrls: ['./candidates-profile.component.css']
})
export class CandidatesProfileComponent implements OnInit {

  constructor(private candidatePositionService: CandidatePositionService) { }

  search_positions:any;

  nom_usuario_temp:any;
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

  ngOnInit(): void {
    this.getCandidatePositions();
  }

  getCandidatePositions(): void {
    let j = 0; // Contador

    this.usuario.username = sessionStorage.getItem("username");

    this.candidatePositionService.getAllCandidatesJson().subscribe(
      data => {
        this.candidatePositions = data;
        this.candidatePositionsFinales = data;

        for (let i = 0; i < this.candidatePositions.length; i++) {
          if(this.usuario.username == this.candidatePositions[i].candidate.username){
            this.candidatePositionsFinales[j] = this.candidatePositions[i];
            j++;
          }
        }

        this.candidatePositionsFinales.length = j;
        console.log(this.candidatePositionsFinales)
      },
      error => {
        console.log(error);
      }
    )
  }

}
