import {Injectable} from '@angular/core';
import {Client} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import {Message} from "../_models/message";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Conversation} from "../_models/Conversation";
import {Canvas} from "../_models/canvas";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  //class responsible for websocket connection

  private stompClient: Client;
  messagesSubj : BehaviorSubject<Map<number, Message>> = new BehaviorSubject<Map<number, Message>>(new Map<number, Message>());
  canvasMap: BehaviorSubject<Map<number,string>> = new BehaviorSubject<Map<number,string>>(new Map<number,string>());

  constructor() {
    this.stompClient = new Client()
    this.initializeWebSocketConnection(localStorage.getItem('id')!);
  }

  sendMessage(message: Message) {
    console.log(message);
    this.stompClient.publish({destination: "/app/hello", body: JSON.stringify(message)});
  }

  sendCanvas(canvas: Canvas) {
    console.log(canvas);
    //print size of object in bytes
    console.log(JSON.stringify(canvas).length);
    try {
      this.stompClient.publish({destination: "/app/canvas", body: JSON.stringify(canvas)});
    } catch (e) {
      console.log(e);
    }
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
    this.stompClient.splitLargeFrames = true;
    this.stompClient.onConnect = (frame) => {
      console.log("connected to websocket");
      this.stompClient.subscribe("/topic/messages/" + uniqueId, (message) => {
        console.log(JSON.parse(message.body));
        console.log('received message');
        let mess: Message = JSON.parse(message.body);
        console.log(mess);
        this.messagesSubj.next(this.messagesSubj.getValue().set(mess.conversation!, mess));
      });

      this.stompClient.subscribe("/topic/canvas/" + uniqueId, (message) => {
        let canv:Canvas = JSON.parse(message.body);
        this.canvasMap.next(this.canvasMap.getValue().set(canv.conversation, canv.data));
      });
    };


    this.stompClient.activate();
  }

}
