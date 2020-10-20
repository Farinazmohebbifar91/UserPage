import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Chart } from 'chart.js';
import { combineLatest } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  username: string;
  user: User;
  isLoading = false;
  barChart = [];
  constructor(private route: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('username')) {
        this.username = paramMap.get('username');
        this.isLoading = true;
        this.usersService.getUser(this.username).subscribe(userData => {
          this.user = userData;
          this.isLoading = false;
        });
      }
    });
    this.getChartData();
  }

  getChartData(): void {
     combineLatest(this.usersService.getFollowers(),
      this.usersService.getfollowerCountListener())
      .subscribe(([usernames, followersCount]) => {
        this.setChart(usernames, followersCount);
    });
  }

  setChart(labels: Array<string>, data: Array<number>): void {
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Followers',
          data,
          backgroundColor: [
            '#ff94c2', '#aab6fe',
            '#df78ef', '#ffeeff',
            '#b2ebf2', '#7a7cff',
            '#aed581', '#ffee58',
            '#ff9e80', '#bcaaa4'
          ],
        }]
      },
      options: {
        title: {
          text : 'Chart',
          display: true
        }
      }
    });
  }
}
