import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';


const routes: Routes = [
  { path: 'home', component: UserListComponent },
  { path: 'newUser', component: EditUserComponent },
  { path: 'editUser', component: EditUserComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
