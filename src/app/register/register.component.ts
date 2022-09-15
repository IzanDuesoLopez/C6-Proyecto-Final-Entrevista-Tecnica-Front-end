import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name = ''
  surname = ''
  username = ''
  password = ''
  password_dos = ''
  invalidRegister = false

  mensaje_error = '';
  hay_error = false;

  regex_nombre_apellidos = /^[A-Za-z]+$/;
  regex_username = /^[a-z0-9]+$/i;

  @Input() error: string | null = "";

  constructor(private router: Router,
    private registerservice: RegisterService) { }

  ngOnInit(): void {
  }

  comprobarCampos() {
    if (this.name == '' || this.surname == '' || this.username == '' || this.password == '' || this.password_dos == '') {
      this.hay_error = true;
      this.mensaje_error = '* Hay uno o más campos vacíos.';
    } else if (this.password !== this.password_dos) {
      this.hay_error = true;
      this.mensaje_error = '* Las contraseñas no coinciden';
    } else if (!this.regex_nombre_apellidos.test(this.name) || !this.regex_nombre_apellidos.test(this.surname)) {
      this.hay_error = true;
      this.mensaje_error = '* Solo se pueden introducir caracteres alfabéticos en el <Nombre> y <Apellido>.'
    } else if (!this.regex_username.test(this.username)) {
      this.hay_error = true;
      this.mensaje_error = '* Solo se pueden introducir caracteres alfanuméricos en el nombre de usuario.'
    } else if (this.password.length > 16 || this.password_dos.length > 16) {
      this.hay_error = true;
      this.mensaje_error = '* Introduce un máximo de 16 caracteres en la contraseña.'
    } else if (this.username.length > 10) {
      this.hay_error = true;
      this.mensaje_error = '* Introduce un máximo de 16 caracteres en el nombre de usuario.'
    } else if (this.surname.length > 20) {
      this.hay_error = true;
      this.mensaje_error = '* Introduce un máximo de 20 caracteres en los apellidos.'
    } else if (this.name.length > 16) {
      this.hay_error = true;
      this.mensaje_error = '* Introduce un máximo de 16 caracteres en el nombre.'
    } else if (this.password.length < 4 || this.password_dos.length < 4) {
      this.hay_error = true;
      this.mensaje_error = '* Introduce un mínimo de 4 caracteres en la contraseña.'
    } else if (this.username.length < 4) {
      this.hay_error = true;
      this.mensaje_error = '* Introduce un mínimo de 4 caracteres en el nombre de usuario.'
    } else {
      this.registerUser();
    }
  }

  registerUser() {
    console.log(this.username, this.password);
    (this.registerservice.register(this.name, this.surname, this.username, this.password).subscribe(
      data => {
        this.router.navigate(['/login'])
        this.invalidRegister = false
        this.hay_error = false;
      },
      error => {
        this.hay_error = true;
        this.mensaje_error = '* Ha ocurrido un error en el registro.'
        this.invalidRegister = true
        this.error = error.message;
      }
    )
    );
  }
}
