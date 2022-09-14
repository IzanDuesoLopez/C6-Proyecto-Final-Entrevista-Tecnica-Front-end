import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  cargando = false;

  public errorUsername = ''
  public errorPassword = ''

  @Input() error: string | null = "";

  constructor(
    private router: Router,
    private loginservice: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  checkLogin() {

    this.errorUsername = ''
    this.errorPassword = ''
    this.error = ''

    this.username = this.username.trim();
    this.password = this.password.trim();

    if(this.username == ""){
      this.errorUsername = "El nombre de usuario es obligatorio.";
    }
    if(this.password == ""){
      this.errorPassword = "La contraseña es obligatoria.";
    }

    if(this.errorUsername == "" && this.errorPassword == "" ){
      this.cargando = true;
      (this.loginservice.authenticate(this.username, this.password).subscribe(
          data => {
            this.router.navigate(['/home'])
            this.invalidLogin = false
            this.cargando = false;
          },
          error => {
            this.invalidLogin = true
            console.log(error.message)
            this.error = "Datos de inicio de sesión incorrectos.";
            this.cargando = false;
          }
        )
      );

    }
  }
}
