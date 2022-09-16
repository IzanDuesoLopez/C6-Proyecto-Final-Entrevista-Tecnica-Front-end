import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from '../models/skill.model';
import { User } from '../models/user.model';
import { SkillsService } from '../service/skills.service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-hrusers-profile',
  templateUrl: './hrusers-profile.component.html',
  styleUrls: ['./hrusers-profile.component.css']
})

export class HrusersProfileComponent implements OnInit {

  // Variables for admin users.
  username:any;
  user:any;

  // Contains all users and skills.
  users:any = null;
  skills:any = null;

  // Activates and deactivates windows with the functionalities of each field.
  showUser = false;
  showSkill = false;

  // Search
  searchUsers = ''
  searchSkills = ''

  // Variables for user windows functionalities.
  // Add user.
  userToAdd: User = {
    id: '',
    name: '',
    surname: '',
    username: '',
    enabled: '',
    roles: [{}]
  }
  userToAddPassword = ''
  showAddUser = false;

  // Edit specific user.
  userToEdit: User = {
    id: '',
    name: '',
    surname: '',
    username: '',
    enabled: '',
    roles: [{}]
  }
  showUserToEdit = false

  // Add skill.
  skillToAdd: Skill = {
    name: ''
  }
  showAddSkill = false;

  // Edit specific skill.
  skillToEdit: Skill = {
    id: '',
    name: ''
  }
  showSkillToEdit = false

  // Activates message to inform if there is a correct update to the request the user did.
  submitted = false

  // Default constructor.
  constructor(
    private router: Router,
    private usersService:UsersService,
    private skillsService:SkillsService
  ) { }

  ngOnInit(): void {

    // Gets info of the logged admin user.
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

    // Gets all the users.
    this.usersService.getAll()
    .subscribe(
      result => {
        this.users = result;
      }
    )

    // Gets all the skills.
    this.skillsService.getAll()
    .subscribe(
      result => {
        this.skills = result;
      }
    )
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //             Functions that shows main functionalities of the 'ADMIN' users.
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // Users
  showUsers(){
    this.showAddUser = false;
    this.submitted = false
    this.showUser = true;
    this.showSkill = false;
    this.showUserToEdit = false
    this.showSkillToEdit = false
    this.showAddSkill = false
  }

  // Skills
  showSkills(){
    this.showAddUser = false;
    this.submitted = false
    this.showUser = false;
    this.showSkill = true;
    this.showUserToEdit = false
    this.showSkillToEdit = false
    this.showAddSkill = false
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //                  Functionalities of 'Users' Section.
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // Insert user.

  // Shows panel to insert a new user.
  showAddUsers(){
    this.showAddUser = true;
    this.submitted = false
    this.showUser = false;
    this.showSkill = false;
    this.showUserToEdit = false
    this.showSkillToEdit = false
    this.showAddSkill = false
  }

  // Registers new user.
  addUser(){
    this.submitted = false
    this.usersService.add(this.userToAdd.name, this.userToAdd.surname, this.userToAdd.username, this.userToAddPassword )
    .subscribe(
      response => (
        console.log(response),
        this.submitted = true,
        this.ngOnInit()
      ),
      error => {
        console.log(error.message)
      }
    )
  }

  // Update user.

  // Shows panel to edit the selected user with its information.
  showsUserToEdit(username:any){
    this.showAddUser = false;
    this.submitted = false
    this.showUser = false;
    this.showSkill = false;
    this.showUserToEdit = true
    this.showSkillToEdit = false
    this.showAddSkill = false
    this.userToEdit.username = username
    this.usersService.findByUsername(this.userToEdit.username)
    .subscribe(
      result => {
        this.userToEdit = result;
      }
    )
  }

  // Saves the new data and updates the user.
  updateUser(id:any){
    this.submitted = false
    this.showUserToEdit = true
    const data = {
      name: this.userToEdit.name,
      surname: this.userToEdit.surname,
      username: this.userToEdit.username,
      roles: this.userToEdit.roles
    };

    this.usersService.update(id, data)
      .subscribe(
        response => (
          console.log(response),
          this.submitted = true,
          this.ngOnInit()
        ),
        error => {
          console.log(error)
        }
      );
  }

  // Delete user.
  deleteUser(id:any){
    if (confirm('Are you sure you want to delete the user with ID: ' + id + '?')) {
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

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //                  Functionalities of 'Skills' Section.
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // Insert skill.

  // Shows panel to insert a new user.
  showAddSkills(){
    this.showAddUser = false;
    this.submitted = false
    this.showUser = false;
    this.showSkill = false;
    this.showUserToEdit = false
    this.showSkillToEdit = false
    this.showAddSkill = true
  }

  // Registers new user.
  addSkill(){
    this.submitted = false
    this.skillsService.add(this.skillToAdd.name )
    .subscribe(
      response => (
        console.log(response),
        this.submitted = true,
        this.ngOnInit()
      ),
      error => {
        console.log(error.message)
      }
    )
  }

  // Update skill.

  // Shows panel to edit the selected skill with its information.
  showsSkillToEdit(id:any){
    this.showAddUser = false;
    this.submitted = false
    this.showUser = false;
    this.showSkill = false;
    this.showUserToEdit = false
    this.showSkillToEdit = true
    this.showAddSkill = false
    this.skillToEdit.id = id
    this.skillsService.get(this.skillToEdit.id)
    .subscribe(
      result => {
        this.skillToEdit = result;
      }
    )
  }

  // Saves the new data and updates the skill.
  updateSkill(id:any){
    this.submitted = false
    this.showSkillToEdit = true
    const data = {
      name: this.skillToEdit.name
    };

    this.skillsService.update(id, data)
      .subscribe(
        response => (
          console.log(response),
          this.submitted = true,
          this.ngOnInit()
        ),
        error => {
          console.log(error)
        }
      );
  }

  // Delete skill.
  deleteSkill(id:any){
    if (confirm('Are you sure you want to delete the skill with ID: ' + id + '?')) {
      this.skillsService.delete(id)
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
