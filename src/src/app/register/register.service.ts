import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(public http: HttpClient) { }

  Register(user: UserModel) {
    return <Observable<boolean>>(
      this.http.post("http://localhost:3000/user", JSON.stringify(user), this.httpOptions)
    );
  }
}
