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

  }

}
