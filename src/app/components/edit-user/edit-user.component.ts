import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { FormError } from 'src/app/interfaces/error';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  editing: boolean;
  errors: Array<FormError>;
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    empStatus: new FormControl('', [Validators.required]),
    favColor: new FormControl('')
  });

  ngOnInit() {
    this.setForumGroup();
    this.errors = [];
  }

  setForumGroup(): void {
    this.editing = false;
    if (this.userService.selectedUser) {
      this.editing = true;
      const user = this.userService.selectedUser;
      this.userForm.patchValue({firstName: user.firstName});
      this.userForm.patchValue({lastName: user.lastName});
      this.userForm.patchValue({email: user.emailAddress});
      this.userForm.controls.email.disable();
      this.userForm.patchValue({birthday: user.birthday});
      this.userForm.patchValue({empStatus: user.employmentStatus});
      if (user.favoriteColor) { this.userForm.patchValue({favColor: user.favoriteColor}); }
    }
  }

  submitForm(): void {
    this.errors = [];
    // validate the form along side the validation of the form
    if (this.userForm.valid) {
      const color = this.userForm.controls.favColor.value === undefined ? null : this.userForm.controls.favColor.value;
      // crete the new user object
      const newUser: User = {
        firstName: this.userForm.controls.firstName.value,
        lastName: this.userForm.controls.lastName.value,
        emailAddress: this.userForm.controls.email.value,
        birthday: this.userForm.controls.birthday.value,
        employmentStatus: this.userForm.controls.empStatus.value,
        favoriteColor: color
      };
      console.log(newUser);
      // finally add the user to the database
      if (this.userService.selectedUser === undefined) {
        this.userService.addUser(newUser).subscribe(message => {
          // submit some data to a toast and redirect to the home page
          this.router.navigate(['/home']);
          alert('User added successfuly!');
        });
      } else {
        this.userService.editUser(newUser).subscribe(message => {
          // submit some data to a toast and redirect to the home page
          this.router.navigate(['/home']);
          alert('User edited successfuly!');
        });
      }
    } else {
      // display the problems with the form
      if (this.userForm.controls.firstName.errors != null) {this.errors.push({message: 'First name is required'}); }
      if (this.userForm.controls.lastName.errors != null) {this.errors.push({message: 'Last name is required'}); }
      if (this.userForm.controls.email.errors != null) {this.errors.push({message: 'Email is required'}); }
      if (this.userForm.controls.birthday.errors != null) {this.errors.push({message: 'Birthday is required'}); }
      if (this.userForm.controls.empStatus.errors != null) {this.errors.push({message: 'Employment Status is required'}); }
    }
  }

  ngOnDestroy() {
    this.userService.clearSelectedUser();
  }

}
