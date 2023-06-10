import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ChatUser} from "../_models/ChatUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url:string = "http://localhost:8080/api/v1/users";
  constructor(private httpClient: HttpClient) { }

  getUsers() {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.httpClient.get<ChatUser[]>(this.url+"/all",{headers});
  }

  getFilteredUsers(searchTerm: string) {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.httpClient.get<ChatUser[]>(this.url+"/search/"+searchTerm,{headers});
  }
}
