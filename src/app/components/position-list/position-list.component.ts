import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatePosition } from 'src/app/models/candidate-position.model';
import { Position } from 'src/app/models/position.model';
import { CandidatePositionService } from 'src/app/service/candidate-position.service';
import { PositionService } from 'src/app/service/position.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {

  nom_usuario_temp: any;
  datos_candidato: any;
  datos_posicion: any;

  botones = Array().fill(false);

  positions?: Position[];
  currentPosition: Position = {};
  posicion_temp: Position = {};
  currentIndex = -1;
  search_title = '';

  buscar = false;

  candidatePosition: CandidatePosition = {
    registry_date: new Date(),
    test_date: new Date(),
    completion_date: new Date(),
    result: 10,
    candidate: '',
    position: ''
  };
  submitted = false;

  constructor(private positionService: PositionService,
    private candidatePositionService: CandidatePositionService,
    private router: Router,
    private userService: UsersService) { }

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
    alert("Te has apuntado a la candidatura " + position.title)
    //this.router.navigateByUrl('/profile')
  }

  searchTitle(): void {
    this.buscar = true;

    this.currentPosition = {};
    this.currentIndex = -1;

    this.positionService.getByTitle(this.search_title)
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

  saveCandidatePosition(i: any): void {
    this.nom_usuario_temp = sessionStorage.getItem("username");

    this.userService.findByUsername(this.nom_usuario_temp).subscribe(
      data => {
        this.datos_candidato = data;

        this.positionService.getByTitle(this.currentPosition.title).subscribe(
          datosposition => {
            this.datos_posicion = datosposition;
            this.posicion_temp = this.datos_posicion[0];
            console.log(this.posicion_temp)
            const datos = {
              registry_date: this.candidatePosition.registry_date,
              test_date: null,
              completion_date: null,
              result: this.candidatePosition.result,
              candidate: this.datos_candidato,
              position: this.posicion_temp
            };

            this.candidatePositionService.createCandidatePosition(datos).subscribe(
              response => {
                console.log(response);
                this.submitted = true;
              },
              error => {
                console.log(error);
              }
            );

          },
          error => {
            console.log(error)
          }
        )
      },
      error => {
        console.log(error);
      }

    )

  }



  newCandidatePosition(): void {
    this.submitted = false;
    this.candidatePosition = {
      registry_date: new Date(),
      test_date: new Date(),
      completion_date: new Date(),
      result: 10,
      candidate: '',
      position: ''
    };
  }

}
