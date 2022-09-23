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

  /**
   * Default constructor.
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Provide username and password for authentication, and once authentication is successful,
   * store JWT token in session.
   * @param username
   * @param password
   * @returns
   */
  authenticate(username: any, password: any) {
    return this.httpClient
      .post<any>("https://team3-c6-project.herokuapp.com/login", { username, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  /**
   * Checks if the user if logged.
   * @returns
   */
  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    // console.log(!(user === null));
    return !(user === null);
  }

  /**
   * Logs out the user by clearing the username from the session storage.
   */
  logOut() {
    sessionStorage.removeItem("username");
  }

}
