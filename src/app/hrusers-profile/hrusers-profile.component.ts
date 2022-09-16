import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-hrusers-profile',
  templateUrl: './hrusers-profile.component.html',
  styleUrls: ['./hrusers-profile.component.css']
})
export class HrusersProfileComponent implements OnInit {

  username:any;
  user:any;

  users:any = null;

  constructor(
    private router: Router,
    private usersService:UsersService
  ) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");

    this.usersService.findByUsername(this.username)
    .subscribe(
      result => {
        this.user = result;
      },
      error => {
        console.log(error)
      }
    )

    this.usersService.getAll()
    .subscribe(
      result => {
        this.users = result;
      }
    )

  }

  deleteUser(id:any){
    if (confirm('Are you sure you want to delete?')) {
      this.usersService.delete(id)
      .subscribe(
        response => (
          console.log(response),
          this.ngOnInit()
        ),
        error => {
          console.log(error)
        }
      );
    }
  }

}
