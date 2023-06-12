import {Injectable} from '@angular/core';
import {Client} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import {Message} from "../_models/message";
import {BehaviorSubject} from "rxjs";
import {Canvas} from "../_models/canvas";

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
    // @ts-ignore
    this.stompClient.webSocketFactory = () => socket;
    this.stompClient.splitLargeFrames = true;
    this.stompClient.onConnect = (frame) => {
      this.stompClient.subscribe("/topic/messages/" + uniqueId, (message) => {
        let mess: Message = JSON.parse(message.body);
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
