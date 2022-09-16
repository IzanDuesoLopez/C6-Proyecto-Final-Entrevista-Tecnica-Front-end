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
  invalidRegister = false

  @Input() error: string | null = "";

  constructor(
    private router: Router,
    private registerservice: RegisterService
  ) { }

  ngOnInit(): void {
  }

  registerUser() {
    console.log(this.username, this.password);
    (this.registerservice.register(this.name, this.surname, this.username, this.password).subscribe(
        data => {
          this.router.navigate(['/login'])
          this.invalidRegister = false
        },
        error => {
          this.invalidRegister = true
          this.error = error.message;

        }
    )

    );
  }
}
