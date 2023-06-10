import {ChangeDetectorRef, Injectable} from '@angular/core';
import {Client} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import {Message} from "../_models/message";
import {Options} from "sockjs-client";
import {Observable, of} from "rxjs";
//#todo chujowyh subcsribe topic messages trzeba zamiienic tak jak jest w message controller na backu
//#todo rozkminic jak to sie ma laczyc z prywatnym socketem a nie brocastowym
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  //class responsible for websocket connection

  private stompClient: Client ;
   messages:  Observable<Map<string,Message[]>> = of(new Map<string,Message[]>());
  constructor() {
    this.stompClient = new Client()
    this.initializeWebSocketConnection(localStorage.getItem('id')!);
  }

  sendMessage(message: Message) {
    console.log(message);
    this.stompClient.publish({destination: "/app/hello", body: JSON.stringify(message)});
  }

  public initializeWebSocketConnection(uniqueId:string) {
    if  (uniqueId == null){
      console.error("not logged");
      throw new Error("not logged");
    }
    //initialize websocket connection

    const socket = new SockJS("http://localhost:8080/ws");
    // @ts-ignore
    this.stompClient.webSocketFactory = () => socket;
    this.stompClient.onConnect = (frame) => {
      console.log("connected to websocket");
       this.stompClient.subscribe("/topic/messages/"+uniqueId, (message) => {
        console.log(JSON.parse(message.body));
        let mess:Message = JSON.parse(message.body);
        this.messages.subscribe(map => {
          if (map.has(mess.sender)){
            map.get(mess.sender)?.push(mess);
          }else {
            map.set(mess.sender,[mess]);
          }

        } );
        console.log(this.messages);
      });
    };
    this.stompClient.activate();
  }
}
