import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../_models/user";
import {AuthResponse} from "../_models/AuthResponse";
import {shareReplay} from "rxjs";
import {AuthRequest} from "../_models/AuthRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url:string;
  private http: HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
    this.url = "http://localhost:8080/api/v1/auth"
  }

  public save(user: User) {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<AuthResponse>(this.url+"/register",user,{headers})
      .pipe(
        shareReplay(),
      );
  }

  authenticate(authRequest: AuthRequest) {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<AuthResponse>(this.url+"/authenticate",authRequest, {headers})
      .pipe(
        shareReplay(),
      );
  }

  logout () {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return this.http.get(this.url+"/logout");
  }
}
