import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Conversation} from "../_models/Conversation";
import {GroupRequest} from "../_models/GroupRequest";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  readonly url:string = "http://localhost:8080/api/v1/conversation/";
  constructor(private httpClient:HttpClient) { }


  getConversations(){
    return this.httpClient.get<Conversation[]>(this.url+"all");
  }

  getConversation(id: number) {
      return this.httpClient.get<Conversation>(this.url+id);
  }

  createConversation(conversation: GroupRequest) {
    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this.httpClient.post<Conversation>(this.url+"create", conversation,{'headers':headers});
  }
}
