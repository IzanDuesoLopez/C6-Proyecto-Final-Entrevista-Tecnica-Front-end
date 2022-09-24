import { DatePipe } from '@angular/common';
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

  // Class variables
  imagenesPosiciones: any[] = ['../../../assets/img/Posiciones.png', '../../../assets/img/Logo.png']

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
    test_date: null,
    completion_date: null,
    result: null,
    candidate: '',
    position: ''
  };
  submitted = false;

  /**
   * Constructor with parameters
   * @param positionService
   * @param candidatePositionService
   * @param router
   * @param userService
   */
  constructor(private positionService: PositionService,
    private candidatePositionService: CandidatePositionService,
    private router: Router,
    private userService: UsersService,
    private datePipe: DatePipe
  ) { }

  /**
   * Function that runs when the component instanciates
   */
  ngOnInit(): void {
    console.log("----------------------------------")
    console.log(this.candidatePosition.registry_date)
    this.retrievePositions();
  }

  /**
   * Method that retrieve positions
   */
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

  /**
   * Method that refresh the position list
   */
  refreshList(): void {
    this.retrievePositions();
    this.currentPosition = {};
    this.currentIndex = -1;
  }

  /**
   * Method to ser the active position
   * @param position
   * @param index
   */
  setActivePosition(position: Position, index: number): void {
    this.currentPosition = position;
    this.currentIndex = index;
    alert("Te has apuntado a la candidatura " + position.title)
    //this.router.navigateByUrl('/profile')
  }

  /**
   * Method to search by title
   */
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

  /**
   * Method that saves the candidate position
   * @param i
   */
  saveCandidatePosition(i: any): void {
    this.nom_usuario_temp = sessionStorage.getItem("username");

    this.userService.findByUsername(this.nom_usuario_temp).subscribe(
      data => {
        this.datos_candidato = data;

        this.positionService.getByTitle(this.currentPosition.title).subscribe(
          datosposition => {
            this.datos_posicion = datosposition;
            this.posicion_temp = this.datos_posicion[0];
            this.candidatePosition.registry_date.setHours(parseInt(this.candidatePosition.registry_date.getHours()))

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



  /**
   * Method to create a new candidate position
   */
  newCandidatePosition(): void {
    this.submitted = false;
    this.candidatePosition = {
      registry_date: new Date(),
      test_date: new Date(),
      completion_date: new Date(),
      result:'',
      candidate: '',
      position: ''
    };
  }

}
