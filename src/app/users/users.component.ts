import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isLoading = false;
  users: any = [];
  totalCount: number;
  user: any = {};
  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  searchUsers(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.usersService.searchUsers(form.value.username)
    .subscribe((data) => {
      this.users = data.items.splice(0, 10);
      this.totalCount = data.total_count;
      this.isLoading = false;
    });
    form.resetForm();
  }
}
