import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  /**
   * Default constructor.
   * @param authentocationService
   * @param router
   */
  constructor(
    private authentocationService: AuthenticationService,
    private router: Router) {

  }

  /**
   * Logs out the current user and redirects to login.
   */
  ngOnInit() {
    this.authentocationService.logOut();
    this.router.navigate(['login']);
  }

}
