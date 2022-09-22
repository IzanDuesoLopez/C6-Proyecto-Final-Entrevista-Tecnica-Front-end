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

  // Class variables
  username:any;
  user:any;
  es_admin = false;

  /**
   * Constructor class that instanciates the login and user service
   * @param route
   * @param router
   * @param loginService
   * @param usersService
   */
  constructor(
    private route:ActivatedRoute,
    private router: Router,
    public loginService:AuthenticationService,
    private usersService:UsersService
  ) { }

  /**
   * When the navbar is instanciated, we find the username and check if its
   * or not the admin role
   */
  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");

    this.usersService.findByUsername(this.username)
    .subscribe(
      result => {
        this.user = result;
        if(this.user.roles[0].name=="ADMIN"){
          this.es_admin = true;
        }else{
          this.es_admin = false;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * We redirect the user depending of his role in the redirectProfileType method
   */
  redirectProfileType(){
    this.username = sessionStorage.getItem("username");

    this.usersService.findByUsername(this.username)
    .subscribe(
      result => {
        this.user = result;
        if(this.user.roles[0].name=="ADMIN"){
          this.router.navigate(['/profile-admin'])
        }
        if(this.user.roles[0].name=="USER"){
          this.router.navigate(['/profile'])
        }
      },
      error => {
        console.log(error)
      }
    )
  }

}
