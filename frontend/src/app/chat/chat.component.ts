import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../_services/websocket.service";
import {Message} from "../_models/message";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{

  messages:Message[]=[];
  newMessage: any;
  constructor(
    private webSocketService: WebsocketService
  ) {
    this.messages = this.webSocketService.messages;
  }


  sendMessage(mess: string) {
    console.log(mess);
      let message:Message =   {
        conversation: 1,
        sender: '#1',
        receiver: '#1',
        text: mess,
        date: new Date()
      };
    this.webSocketService.sendMessage(message);
  }



}
