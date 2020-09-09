import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  loggedInUser: string;

  // get the logged in user from the user service
  ngOnInit() {
    this.loggedInUser = this.userService.getLoggedInUser();
  }

}
