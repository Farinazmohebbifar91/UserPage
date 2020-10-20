import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, zip} from 'rxjs';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}
  private usersUpdated = new Subject<{ users: Array<User>; userCount: number }>();
  private followersCount = new Subject<Array<number>>();

  searchUsers(inputUsername: string): void {
    const url = 'https://api.github.com/search/users';

    let params: HttpParams = new HttpParams();
    params = params.append('q', inputUsername);

    this.http.get<any>(url, { params })
    .subscribe(userData => {
      this.usersUpdated.next({
        users: [...userData.items.splice(0, 10)],
        userCount: userData.total_count
      });
      localStorage.setItem('users', JSON.stringify(userData.items.splice(0, 10)));
    });
  }

  getUserUpdateListener(): Observable<{ users: Array<User>; userCount: number }> {
    return this.usersUpdated.asObservable();
  }

  getUser(username: string): Observable<User> {
    const url = 'https://api.github.com/users/';
    return this.http.get<User>(url + username);
  }

  getFollowers(): Observable<Array<string>> {
    const users = JSON.parse(localStorage.getItem('users'));
    const usernames = users.map((user: User) => user.login);
    this.fetchFollowersCount(usernames);
    return of(usernames);
  }

  getfollowerCountListener(): Observable<Array<number>> {
    return this.followersCount.asObservable();
  }

  fetchFollowersCount(usernames: Array<string>): void {
    const url = 'https://api.github.com/users/';
    const followersCounts: Array<number> = [];
    let followerCount: Array<number> = [];

    zip(...usernames.map((username) => this.http.get<Array<any>>(url + username)))
    .subscribe(usersData => {
      followerCount = usersData.map((data: any) => data.followers);
      this.followersCount.next(followerCount);
       });

  }
}
