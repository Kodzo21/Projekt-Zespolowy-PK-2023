import {Injectable} from '@angular/core';
import {Client} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import {Message} from "../_models/message";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  //class responsible for websocket connection

  private stompClient: Client ;
   messages: Message[] = [];
  constructor() {
    this.stompClient = new Client()
    this.initializeWebSocketConnection(localStorage.getItem('uniqueId')!);
  }

  sendMessage(message: Message) {
    this.stompClient.publish({destination: "/app/hello", body: JSON.stringify(message)});
  }

  private initializeWebSocketConnection(uniqueId:string) {
    //initialize websocket connection
    const socket = new SockJS("http://localhost:8080/ws");
    // @ts-ignore
    this.stompClient.webSocketFactory = () => socket;
    this.stompClient.onConnect = (frame) => {
      console.log("connected to websocket");
      this.stompClient.subscribe("/topic/messages", (message) => {
        console.log(message);
        this.messages.push(JSON.parse(message.body));
      }, {id: uniqueId});
    };
    this.stompClient.activate();
  }
}
