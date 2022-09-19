import { Component, OnInit } from '@angular/core';
import { CandidatePosition } from '../models/candidate-position.model';
import { CandidatePositionService } from '../service/candidate-position.service';

@Component({
  selector: 'app-candidates-profile',
  templateUrl: './candidates-profile.component.html',
  styleUrls: ['./candidates-profile.component.css']
})
export class CandidatesProfileComponent implements OnInit {

  constructor(private candidatePositionService: CandidatePositionService) { }

  nom_usuario_temp:any;
  candidatePositions?: CandidatePosition[];
  candidatePositionsFinales?: CandidatePosition[];
  currentPosition: CandidatePosition = {};

  registry_date = new Date()
  test_date = new Date()
  completion_date = new Date()
  result = 10
  candidate = ''
  position = ''

  ngOnInit(): void {
  }

  getCandidatePositions(): void {
    this.nom_usuario_temp = sessionStorage.getItem("username");

    this.candidatePositionService.getAllCandidatesJson().subscribe(
      data => {
        this.candidatePositions = data;
        console.log(this.candidatePositions);

        for (let i = 0; i < this.candidatePositions.length; i++) {
          this.currentPosition = this.candidatePositions[i];
          if(this.currentPosition.candidate.username == this.nom_usuario_temp){
            this.candidatePositionsFinales?.push(this.currentPosition);
            console.log(this.currentPosition.candidate.name)
          }
        }
      },
      error => {
        console.log(error);
      }
    )



  }

}
