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

  candidatePositions?: CandidatePosition[];

  ngOnInit(): void {
  }

  getCandidatePositions(): void {
    this.candidatePositionService.getAllCandidatesJson().subscribe(
      data => {
        this.candidatePositions = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

}
