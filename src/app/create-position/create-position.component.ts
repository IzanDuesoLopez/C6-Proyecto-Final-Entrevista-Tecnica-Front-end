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

  // Class variables

  position: Position = {
    title: '',
    description: '',
    id_HR_Users: ''
  };
  submitted = false;
  cargando = false;
  nom_usuario_temp: any;

  username:any;
  user:any;

  /**
   * Constructor that instanciates the following objects
   * @param positionService
   * @param router
   * @param userService
   */
  constructor(private positionService: PositionService, private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");

    this.userService.findByUsername(this.username)
    .subscribe(
      result => {
        this.user = result;
        if(!(this.user.roles[0].name=="ADMIN")){
          this.router.navigate(['/home'])
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Method to save the position that is created
   */
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

  /**
   * Method to create a new position
   */
  newPosition(): void {
    this.submitted = false;
    this.position = {
      title: '',
      description: '',
      id_HR_Users: ''
    }
  }

}
