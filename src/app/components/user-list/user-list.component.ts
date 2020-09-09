import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  userList: Array<User>;
  shownUsers: Array<User>;
  showPrompt: boolean;
  pendingUser: User;
  curPage: number;
  totalUsers: number;
  totalPages: number;
  usersPerPage = 5;

  ngOnInit() {
    this.curPage = 1;
    this.getUsers();
    this.showPrompt = false;
  }

  // get the users and set up the defult pagination
  getUsers(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.curPage = 1;
        this.userList = data;
        this.shownUsers = data.slice(0, this.usersPerPage);
        this.totalUsers = data.length;
        this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
      }
    );
  }

  // set the users that will be on the next page
  nextPage(){
    if (this.curPage < this.totalPages){
      this.shownUsers = this.userList.slice((this.curPage * this.usersPerPage), ((this.curPage + 1) * this.usersPerPage));
      this.curPage++;
    }
  }

  // set the users that will be on the previous page
  previousPage(){
    if (this.curPage > 1){
      this.curPage--;
      this.shownUsers = this.userList.slice(((this.curPage - 1) * this.usersPerPage), (this.curPage * this.usersPerPage));
    }
  }

  // set the user to be edited and navigate to that user
  setUser(user: User): void {
    this.userService.setSelectedUser(user);
    this.router.navigate(['/editUser']);
  }

  // show the delete prompt and set the user to be deleted
  showDeletePrompt(user: User): void {
    this.pendingUser = user;
    this.showPrompt = true;
  }

  // close the delete prompt and clear the selected user
  denyDelete(): void{
    this.pendingUser = null;
    this.showPrompt = false;
  }

  // confirm the deletion and make the request to delete the user
  confirmDelete(): void {
    this.userService.deleteUser(this.pendingUser).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      if ( data['message'] === 'user deleted') {
        // push something to a toast service
        alert('User deleted successfuly!');
        this.pendingUser = null;
        this.getUsers();
      } else {
        // push the fail message to the prompt
        alert('Something went wrong when deleting user!');
      }
    });
    this.showPrompt = false;
  }

}
