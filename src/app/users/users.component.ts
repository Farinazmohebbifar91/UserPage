import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isLoading = false;
  users: Array<User> = [];
  user: any = {};
  totalCount: number;
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
  }

  searchUsers(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.usersService.searchUsers(form.value.username);
    this.usersService.getUserUpdateListener()
    .subscribe((data) => {
      this.users = data.users;
      this.totalCount = data.userCount;
      this.isLoading = false;
    });
    form.resetForm();
  }

}
