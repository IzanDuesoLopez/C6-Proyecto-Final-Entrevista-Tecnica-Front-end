import { Component, OnInit } from '@angular/core';
import { CandidatePosition } from 'src/app/models/candidate-position.model';
import { Position } from 'src/app/models/position.model';
import { CandidatePositionService } from 'src/app/service/candidate-position.service';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {

  // Deshabilita botones.
  clicked:any;

  positions?: Position[];
  currentPosition: Position = {};
  currentIndex = -1;
  title = '';

  buscar = false;

  candidatePosition: CandidatePosition = {
    registry_date: new Date(),
    test_date: new Date(),
    completion_date: new Date(),
    result: 10,
    id_candidate: 1,
    id_position: ''
  };
  submitted = false;

  constructor(private positionService: PositionService,
    private candidatePositionService: CandidatePositionService) { }

  ngOnInit(): void {
    this.retrievePositions();
  }

  retrievePositions(): void {
    this.positionService.getAll()
      .subscribe(
        data => {
          this.positions = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }

  refreshList(): void {
    this.retrievePositions();
    this.currentPosition = {};
    this.currentIndex = -1;
  }

  setActivePosition(position: Position, index: number): void {
    this.currentPosition = position;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.buscar = true;

    this.currentPosition = {};
    this.currentIndex = -1;

    this.positionService.getByTitle(this.title)
      .subscribe(
        data => {
          this.positions = data;
          console.log(data);
          this.buscar = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  saveCandidatePosition(i:any): void {
    const data = {
      registry_date: this.candidatePosition.registry_date,
      test_date: this.candidatePosition.test_date,
      completion_date: this.candidatePosition.completion_date,
      result: this.candidatePosition.result,
      id_candidate: this.candidatePosition.id_candidate,
      id_position: this.candidatePosition.id_position
    };

    this.candidatePositionService.createCandidatePosition(data).subscribe(
      response => {
        alert(i)
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  newCandidatePosition(): void {
    this.submitted = false;
    this.candidatePosition = {
      registry_date: new Date(),
      test_date: new Date(),
      completion_date: new Date(),
      result: 10,
      id_candidate: 1,
      id_position: ''
    };
  }

}
