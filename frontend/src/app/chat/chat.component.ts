import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SettingsComponent} from "../settings/settings.component";
import {AddUserComponent} from "../add-user/add-user.component";
import {CreateGroupComponent} from "../create-group/create-group.component";
import {Message} from "../_models/message";
import {WebsocketService} from "../_services/websocket.service";
import {ChatUser} from "../_models/ChatUser";
import {AuthService} from "../_services/auth.service";
import {UserService} from "../_services/user.service";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";
import {map, Observable, of} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{


  userList: ChatUser[] = [];

  filteredUsers: any[] = [];

  currentUser: string = '';
  newMessage: string = '';

  messMap : Observable<Map<string,Message[]>> = of(new Map<string,Message[]>());
  messagesMap: Map<string,Message[]> = new Map<string,Message[]>();
  constructor(private router: Router,private dialog: MatDialog,
              private webSocketService:WebsocketService,
              private userService: UserService,
              private changeDetectorRef: ChangeDetectorRef
              ) {}

  ngOnInit() {
    this.filteredUsers = this.userList;
    //todo: u siebie rob jak u siebie
    this.messMap= this.webSocketService.messages;
    this.messMap.subscribe(
      map => {
        this.messagesMap = map;
        this.changeDetectorRef.detectChanges();
      }
    )
    this.userService.getUsers().subscribe(response =>{
      this.userList = response;
    });
  }

  logout() {
    // Logika wylogowania użytkownika
  }

  goToCanvas() {
    this.router.navigate(['/canvas']);
  }

  selectUser(user: any) {
    this.currentUser = user.id;
  }

  sendMessage() {
    // if (this.newMessage) {
    //   this.messages.push({ sender: this.currentUser, text: this.newMessage });
    //   this.newMessage = '';
    // }
    let mess:Message = {
      sender: localStorage.getItem('id')!,
      text: this.newMessage,
      receiver : this.currentUser,
      date: new Date(),
      conversation: null
    }
    this.webSocketService.sendMessage(mess);
    this.messMap.subscribe(map => {
      if (map.has(mess.receiver)){
        map.get(mess.receiver)?.push(mess);
      }else {
        map.set(mess.receiver,[mess]);
      }
    });
  }

  openToSettings(){
      const dialogRef = this.dialog.open(SettingsComponent, {
        width: '400px',
        data: {} // Możesz przekazać dane do dialogu, jeśli jest to potrzebne
      });
}

  openToAddFrined(){
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
      height: '220px',
      data: {} // Możesz przekazać dane do dialogu, jeśli jest to potrzebne
    });
  }

  searchUsers() {
    if (this.currentUser) {
      this.filteredUsers = this.userList.filter(user =>
        user.name.toLowerCase().includes(this.currentUser.toLowerCase())
      );
    } else {
      this.filteredUsers = this.userList;
    }
  }

  openCreateGroup() {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '400px',
      height: '350px',
      data: {} // Możesz przekazać dane do dialogu, jeśli jest to potrzebne
    });
  }

  protected readonly map = map;
}
