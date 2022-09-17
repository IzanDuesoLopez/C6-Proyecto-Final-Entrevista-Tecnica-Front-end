import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Position } from '../models/position.model';
import { PositionService } from '../service/position.service';

@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css']
})
export class CreatePositionComponent implements OnInit {

  position: Position = {
    title: '',
    description: '',
    id_HR_Users: ''
  };
  submitted = false;
  cargando = false;

  constructor(private positionService: PositionService, private router: Router) { }

  ngOnInit(): void {
  }

  savePosition(): void {
    this.cargando = true;
    const data = {
      title: this.position.title,
      description: this.position.description,
      id_HR_Users: this.position.id_HR_Users
    };

    this.positionService.createPosition(data).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.cargando = false;
        this.router.navigate(['/positions'])
      },
      error => {
        console.log(error);
      }
    );
  }

  newPosition(): void {
    this.submitted = false;
    this.position = {
      title: '',
      description: '',
      id_HR_Users: ''
    }
  }

}
