import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "../_models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly url:string = "http://localhost:8080/api/v1/messages/";

  constructor(private httpClient:HttpClient) { }

  getMessages(conversationId: number) {
    const header = new HttpHeaders().set('Content-Type','application/json');
    return this.httpClient.get<Message[]>(this.url + conversationId, {headers: header}  );
  }
}
