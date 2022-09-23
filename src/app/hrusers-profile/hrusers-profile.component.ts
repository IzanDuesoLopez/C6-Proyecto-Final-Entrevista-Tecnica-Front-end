import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatePosition } from '../models/candidate-position.model';
import { CandidateSkill } from '../models/candidate-skill.model';
import { Skill } from '../models/skill.model';
import { User } from '../models/user.model';
import { CandidatePositionService } from '../service/candidate-position.service';
import { CandidateSkillsService } from '../service/candidate-skills.service';
import { SkillsService } from '../service/skills.service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-hrusers-profile',
  templateUrl: './hrusers-profile.component.html',
  styleUrls: ['./hrusers-profile.component.css']
})

export class HrusersProfileComponent implements OnInit {

  // Variables for admin users.
  username: any;
  user: any;

  // Contains all users and skills.
  users: any = null;
  skills: any = null;

  // Activates and deactivates windows with the functionalities of each field.
  showUser = false;
  showSkill = false;

  // Search
  searchUsers = ''
  searchSkills = ''
  searchExams = ''

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

  // Avalue user.
  show_skills = true
  show_exams = false

  userToAvalue: User = {
    id: '',
    name: '',
    surname: '',
    username: '',
    enabled: '',
    roles: [{}]
  }
  showUserToAvalue = false

  skillsFromUser: any
  candidatePositionsFromUser: any

  candidateSkill: CandidateSkill = {
    id: '',
    value: '',
    notes: '',
    skill: new Skill,
    candidate: new User
  }

  // Variables for skill windows functionalities.
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

  /**
   * Default constructor.
   * @param router
   * @param usersService
   * @param skillsService
   * @param candidateSkillsService
   * @param candidatePositionService
   */
  constructor(
    private router: Router,
    private usersService: UsersService,
    private skillsService: SkillsService,
    private candidateSkillsService: CandidateSkillsService,
    private candidatePositionService: CandidatePositionService
  ) { }

  /**
   * Loads when component its called.
   */
  ngOnInit(): void {

    // Gets info of the logged admin user.
    this.username = sessionStorage.getItem("username");

    this.usersService.findByUsername(this.username)
      .subscribe(
        result => {
          this.user = result;
          if(!(this.user.roles[0].name=="ADMIN")){
            this.router.navigate(['/home'])
          }
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
          this.showUsers()
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

  /**
   * Users.
   */
  showUsers() {
    this.showAddUser = false; this.showUserToAvalue = false
    this.submitted = false
    this.showUser = true;
    this.showSkill = false;
    this.showUserToEdit = false
    this.showSkillToEdit = false
    this.showAddSkill = false
  }

  /**
   * Skills.
   */
  showSkills() {
    this.showAddUser = false; this.showUserToAvalue = false
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

  /**
   * Shows panel to insert a new user.
   */
  showAddUsers() {
    this.showAddUser = true; this.showUserToAvalue = false
    this.submitted = false
    this.showUser = false;
    this.showSkill = false;
    this.showUserToEdit = false
    this.showSkillToEdit = false
    this.showAddSkill = false
  }

  /**
   * Registers new user.
   */
  addUser() {
    this.submitted = false
    this.usersService.add(this.userToAdd.name, this.userToAdd.surname, this.userToAdd.username, this.userToAddPassword)
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

  /**
   * Shows panel to edit the selected user with its information.
   * @param username
   */
  showsUserToEdit(username: any) {
    this.showAddUser = false; this.showUserToAvalue = false
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

  /**
   * Saves the new data and updates the user.
   * @param id
   */
  updateUser(id: any) {
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

  /**
   * Delete user.
   * @param id
   */
  deleteUser(id: any) {
    if (confirm('Seguro que quieres eliminar este usuario con la ID: ' + id + '?')) {
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

  // Avalue the specific user.

  /**
   * Shows panel to avalue with skills the selected user.
   * @param username
   */
  showsUserToAvalue(username: any) {

    this.skillsFromUser = []

    this.showAddUser = false; this.showUserToAvalue = false
    this.submitted = false
    this.showUser = false;
    this.showSkill = false;
    this.showUserToEdit = false
    this.showSkillToEdit = false
    this.showAddSkill = false
    this.userToEdit.username = username
    this.usersService.findByUsername(this.userToEdit.username)
      .subscribe(
        result => {
          this.userToAvalue = result;

          // For the 'Set of skills' section.
          this.candidateSkillsService.getAll()
            .subscribe(
              result => {
                this.skillsFromUser = result;
                let auxArr: any = []
                for (let i = 0; i < this.skillsFromUser.length; i++) {
                  if(this.userToAvalue.id == this.skillsFromUser[i].candidate.id){
                    auxArr.push(this.skillsFromUser[i])
                  }
                }
                this.skillsFromUser = auxArr
              }
            )

          // For the 'Technical tests' section.
          this.candidatePositionService.getAll()
            .subscribe(
              result => {
                this.candidatePositionsFromUser = result
                let auxArr: any = []
                for (let i = 0; i < this.candidatePositionsFromUser.length; i++) {
                  if(this.userToAvalue.id == this.candidatePositionsFromUser[i].candidate.id){
                    this.candidatePositionsFromUser[i].registry_date = (this.candidatePositionsFromUser[i].registry_date != null) || (this.candidatePositionsFromUser[i].registry_date != undefined) ? this.candidatePositionsFromUser[i].registry_date.substring(0, 10) + ' ' + this.candidatePositionsFromUser[i].registry_date.substring(11, 16) : ''
                    this.candidatePositionsFromUser[i].test_date = (this.candidatePositionsFromUser[i].test_date != null) || (this.candidatePositionsFromUser[i].test_date != undefined) ? this.candidatePositionsFromUser[i].test_date.substring(0, 10) + ' ' + this.candidatePositionsFromUser[i].test_date.substring(11, 16) : ''
                    this.candidatePositionsFromUser[i].completion_date = (this.candidatePositionsFromUser[i].completion_date != null) || (this.candidatePositionsFromUser[i].completion_date != undefined) ? this.candidatePositionsFromUser[i].completion_date.substring(0, 10) + ' ' + this.candidatePositionsFromUser[i].completion_date.substring(11, 16) : ''
                    if(this.candidatePositionsFromUser[i].result == null || this.candidatePositionsFromUser[i].result == undefined){ this.candidatePositionsFromUser[i].result == '' }
                    auxArr.push(this.candidatePositionsFromUser[i])
                  }
                }
                this.candidatePositionsFromUser = auxArr
                this.showUserToAvalue = true
              }
            )
        }
      )

  }

  // Add skills to specific user.

  /**
   * It allows the admin to add the selected skill to the user and avalue with a numeric note.
   * @param s // Skill object
   */
  addSkillToUser(s:any) {

    this.candidateSkill.value = prompt("Que nota le quieres poner a este usuario para la habilidad seleccionada?")

    if(this.candidateSkill.value < 0){
      this.candidateSkill.value = 0
      this.candidateSkill.notes = "Suspenso"
    } else if (this.candidateSkill.value >= 0 && this.candidateSkill.value < 5){
      this.candidateSkill.notes = "Suspenso"
    } else if (this.candidateSkill.value >= 5 && this.candidateSkill.value < 7){
      this.candidateSkill.notes = "Bien"
    } else if (this.candidateSkill.value >= 7 && this.candidateSkill.value < 9){
      this.candidateSkill.notes = "Notable"
    } else if (this.candidateSkill.value >= 9 && this.candidateSkill.value < 11){
      this.candidateSkill.notes = "Excelente"
    } else if (this.candidateSkill.value > 10){
      this.candidateSkill.value = 10
      this.candidateSkill.notes = "Excelente"
    }

    this.candidateSkill.skill = s
    this.candidateSkill.candidate = this.userToAvalue
    this.candidateSkillsService.add(this.candidateSkill)
    .subscribe(
      result => {
        console.log("added")
        this.showsUserToAvalue(this.userToAvalue.username)
      }
    )
  }

  /**
   * Deletes a skill from a candidate.
   * @param id
   */
  deleteCandidateSkill(id:any) {
    if (confirm('Seguro que quieres eliminar la habilidad con ID: ' + id + ' de este usuario?')) {
      this.candidateSkillsService.delete(id)
        .subscribe(
          response => (
            console.log(response),
            this.showsUserToAvalue(this.userToAvalue.username)
          ),
          error => {
            console.log(error)
          }
        );
    }
  }

  // Functions to edit the candidatePoitions for the selected user.
  /**
   * @param cp
   */
  editTestDate(cp:CandidatePosition){
    let adminDate:any = ''
    adminDate = prompt("En que fecha quieres realizar esta prueba técnica?", "yyyy-MM-dd hh:mm")
    cp.test_date = new Date(adminDate.substring(0, 4), parseInt(adminDate.substring(5, 7)) - 1, adminDate.substring(8, 10), adminDate.substring(11, 13), adminDate.substring(14, 16))
    cp.test_date.setHours(parseInt(cp.test_date.getHours()) + 2)
    this.candidatePositionService.updateCandidatePosition(cp.id, cp)
    .subscribe(
      response => (
        console.log(response),
        this.showsUserToAvalue(this.userToAvalue.username)
      )
    )
  }
  /**
   * @param cp
   */
  editCompletitionDate(cp:CandidatePosition){
    let adminDate:any = ''
    adminDate = prompt("En que fecha se ha completado esta prueba técnica?", "yyyy-MM-dd hh:mm")
    cp.completion_date = new Date(adminDate.substring(0, 4), parseInt(adminDate.substring(5, 7)) - 1, adminDate.substring(8, 10), adminDate.substring(11, 13), adminDate.substring(14, 16))
    cp.completion_date.setHours(parseInt(cp.completion_date.getHours()) + 2)
    this.candidatePositionService.updateCandidatePosition(cp.id, cp)
    .subscribe(
      response => (
        console.log(response),
        this.showsUserToAvalue(this.userToAvalue.username)
      )
    )
  }
  /**
   * @param cp
   */
  editResult(cp:CandidatePosition){
    cp.result = prompt("Con que nota avaluas esta prueba técnica?", "1-10")
    if(cp.result < 0){
      cp.result = 0
    } else if (cp.result > 10){
      cp.result = 10
    }
    this.candidatePositionService.updateCandidatePosition(cp.id, cp)
    .subscribe(
      response => (
        console.log(response),
        this.showsUserToAvalue(this.userToAvalue.username)
      )
    )
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //                  Functionalities of 'Skills' Section.
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // Insert skill.

  /**
   * Shows panel to insert a new skill.
   */
  showAddSkills() {
    this.showAddUser = false; this.showUserToAvalue = false
    this.submitted = false
    this.showUser = false;
    this.showSkill = false;
    this.showUserToEdit = false
    this.showSkillToEdit = false
    this.showAddSkill = true
  }

  /**
   * Registers new skill.
   */
  addSkill() {
    this.submitted = false
    this.skillsService.add(this.skillToAdd.name)
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

  /**
   * Shows panel to edit the selected skill with its information.
   * @param id
   */
  showsSkillToEdit(id: any) {
    this.showAddUser = false; this.showUserToAvalue = false
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

  /**
   * Saves the new data and updates the skill.
   * @param id
   */
  updateSkill(id: any) {
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

  /**
   * Delete skill.
   * @param id
   */
  deleteSkill(id: any) {
    if (confirm('Seguro que quieres eliminar la habilidad con la ID: ' + id + '?')) {
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
