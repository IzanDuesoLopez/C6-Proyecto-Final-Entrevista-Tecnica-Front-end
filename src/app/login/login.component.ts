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

  @Input() error: string | null = "";

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit(): void {
  }

  checkLogin() {
    this.cargando = true;
    console.log(this.username, this.password);
    (this.loginservice.authenticate(this.username, this.password).subscribe(
        data => {
          this.router.navigate(['/home'])
          this.invalidLogin = false
          this.cargando = false;
        },
        error => {
          this.invalidLogin = true
          this.error = error.message;
          this.cargando = false;
        }
    )

    );
  }
}
