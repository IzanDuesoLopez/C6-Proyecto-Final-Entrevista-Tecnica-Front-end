import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Position } from '../models/position.model';
import { PositionService } from '../service/position.service';
import { UsersService } from '../service/users.service';

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
  nom_usuario_temp: any;

  constructor(private positionService: PositionService, private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
  }

  savePosition(): void {

    this.nom_usuario_temp = sessionStorage.getItem("username");

    this.userService.findByUsername(this.nom_usuario_temp).subscribe(
      dataresult => {
        this.cargando = true;
        const data = {
          title: this.position.title,
          description: this.position.description,
          hr_Users: dataresult
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
        console.log(dataresult)
      },
      error => {
        console.log(error)
      }
    )
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
