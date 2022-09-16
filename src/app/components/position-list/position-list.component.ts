import { Component, OnInit } from '@angular/core';
import { Position } from 'src/app/models/position.model';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {

  positions?: Position[];
  currentPosition: Position = {};
  currentIndex = -1;
  title = '';

  buscar = false;

  constructor(private positionService: PositionService) { }

  ngOnInit(): void {
    this.retrievePositions();
  }

  retrievePositions(): void{
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

}
