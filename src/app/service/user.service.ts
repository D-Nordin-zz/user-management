import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpClient
  ) { }

  selectedUser: User;
  userLink = 'https://h7a2i91ac6.execute-api.us-east-2.amazonaws.com/UserManagement/user';
  addUserLink = 'https://h7a2i91ac6.execute-api.us-east-2.amazonaws.com/UserManagement/adduser';
  editUserLink = 'https://h7a2i91ac6.execute-api.us-east-2.amazonaws.com/UserManagement/edituser';
  deleteUserLink = 'https://h7a2i91ac6.execute-api.us-east-2.amazonaws.com/UserManagement/deleteuser';
  headers = {};

  // return the list of users to be displayed
  getUsers(): Observable<Array<User>> {
     return this.httpService.get<Array<User>>(this.userLink, { headers: this.headers });
  }

  // get the logged in user
  getLoggedInUser(): string {
    return 'Admin';
  }

  // add a new user to the database
  addUser(user: User): Observable<string> {
    return this.httpService.post<string>(
      this.addUserLink,
      user
    );
  }

  // edits a user already in the database
  editUser(user: User): Observable<string> {
    return this.httpService.post<string>(
      this.editUserLink,
      user
    );
  }

  // deletes a user from the db
  deleteUser(user: User): Observable<string> {
    return this.httpService.post<string>(
      this.deleteUserLink,
      user
    );
  }

  // set the selected user for editing
  setSelectedUser(user: User): void {
    this.selectedUser = user;
  }

  // clear the selected user so a new user can be added
  clearSelectedUser(): void {
    this.selectedUser = null;
  }
}
