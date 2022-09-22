import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

export class User {
  constructor(public status: string) { }
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }
  // Provide username and password for authentication, and once authentication is successful,
  //store JWT token in session
  authenticate(username: any, password: any) {
    return this.httpClient
      .post<any>("http://localhost:8080/login", { username, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    // console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }

  // isAdmin() {
  //   let username = sessionStorage.getItem("username");
  //   console.log("USERNAME: " + username)
  //   // return this.httpClient.get("https://team3-c6-project.herokuapp.com/api/candidates/username/" + username)
  //   //       .subscribe(
  //   //         result => {
  //   //           console.log("RESULT: " + result)
  //   //         },
  //   //         error => {
  //   //           console.log("ERROR: " + error.message())
  //   //         }

  //   //       )
  //   return true
  // }
}
