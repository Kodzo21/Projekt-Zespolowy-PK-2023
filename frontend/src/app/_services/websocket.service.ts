import {Injectable} from '@angular/core';
import {Client} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import {Message} from "../_models/message";
import {Observable, of} from "rxjs";
import {Conversation} from "../_models/Conversation";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  //class responsible for websocket connection

  private stompClient: Client;
  messages: Observable<Map<number, Message[]>> = of(new Map<number, Message[]>());

  constructor() {
    this.stompClient = new Client()
    this.initializeWebSocketConnection(localStorage.getItem('id')!);
  }

  sendMessage(message: Message) {
    console.log(message);
    this.stompClient.publish({destination: "/app/hello", body: JSON.stringify(message)});
  }

  public initializeWebSocketConnection(uniqueId: string) {
    if (uniqueId == null) {
      console.error("not logged");
      throw new Error("not logged");
    }
    //initialize websocket connection

    const socket = new SockJS("http://localhost:8080/ws");
    console.log("connecting to websocket");
    // @ts-ignore
    this.stompClient.webSocketFactory = () => socket;
    this.stompClient.onConnect = (frame) => {
      console.log("connected to websocket");
      this.stompClient.subscribe("/topic/messages/" + uniqueId, (message) => {
        console.log(JSON.parse(message.body));
        console.log('received message');
        let mess: Message = JSON.parse(message.body);
        console.log(mess);
        this.messages.subscribe(map => {
          if (map.has(mess.conversation!)) {
            console.log(mess.text);
            map.get(mess.conversation!)?.push(mess);
          } else {
            console.log(mess.conversation + "    z else");
            map.set(mess.conversation!, [mess]);
          }
        });

        console.log(this.messages);
      });
    };

    this.stompClient.activate();
  }


}
