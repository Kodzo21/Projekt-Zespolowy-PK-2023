import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Conversation} from "../_models/Conversation";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  readonly url:string = "http://localhost:8080/api/v1/conversation";
  constructor(private httpClient:HttpClient) { }


  getConversations(){
    return this.httpClient.get<Conversation[]>(this.url+"/all");
  }
}
