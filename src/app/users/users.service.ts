import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  searchUsers(inputUsername: string): Observable<any> {
    const url = 'https://api.github.com/search/users';

    let params: HttpParams = new HttpParams();
    params = params.append('q', inputUsername);

    return this.http.get<any>(url, { params });
  }

}
