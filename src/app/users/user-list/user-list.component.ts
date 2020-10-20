import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: Array<User> = [];
  displayedColumns = ['username'];
  constructor() { }

  ngOnInit() {
  }

}
