import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username:any;
  user:any;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    public loginService:AuthenticationService,
    private usersService:UsersService
  ) { }

  ngOnInit(): void {

  }

  redirectProfileType(){
    this.username = sessionStorage.getItem("username");

    this.usersService.findByUsername(this.username)
    .subscribe(
      result => {
        this.user = result;
        if(this.user.roles[0].name=="ADMIN"){
          this.router.navigate(['/profile-admin'])
        }
      },
      error => {
        console.log(error)
      }
    )
  }

}
