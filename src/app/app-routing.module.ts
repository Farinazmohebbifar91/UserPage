import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: 'user-detail/:username', component: UserDetailComponent},
  { path: '**' , component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
