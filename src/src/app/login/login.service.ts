import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(public http: HttpClient) { }

  Login(user: UserModel) {
    const apiUrl = `http://localhost:3000/user?email=${user.email}`;
    return <Observable<UserModel>>this.http.get(apiUrl)
  }

  Logout() {
    localStorage.removeItem('currentUser');
  }
}
