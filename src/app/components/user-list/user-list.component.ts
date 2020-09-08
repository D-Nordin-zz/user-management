import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

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
  showPrompt: boolean;
  pendingUser: User;

  ngOnInit() {
    this.getUsers();
    this.showPrompt = false;
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      data => this.userList = data
    );
  }

  setUser(user: User): void {
    this.userService.setSelectedUser(user);
    this.router.navigate(['/editUser']);
  }

  showDeletePrompt(user: User): void {
    this.pendingUser = user;
    this.showPrompt = true;
  }

  denyDelete(): void{
    this.pendingUser = null;
    this.showPrompt = false;
  }

  confirmDelete(): void {
    this.userService.deleteUser(this.pendingUser).subscribe(data => {
      if ( data['message'] === 'user deleted') {
        // push something to a toast service
        console.log('deleted');
        this.pendingUser = null;
        this.getUsers();
      } else {
        // push the fail message to the prompt
        console.log('something failed when deleting');
      }
    });
    this.showPrompt = false;
  }

}
