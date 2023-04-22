import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url:string;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:8080/api/v1/auth"
  }

  public save(user: User) {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<User>(this.url+"/register",user,{headers});
  }

}
