import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SettingsComponent} from "../settings/settings.component";
import {AddUserComponent} from "../add-user/add-user.component";
import {CreateGroupComponent} from "../create-group/create-group.component";
import {Message} from "../_models/message";
import {WebsocketService} from "../_services/websocket.service";
import {ChatUser} from "../_models/ChatUser";
import {UserService} from "../_services/user.service";
import {debounceTime} from "rxjs";
import {FormControl} from "@angular/forms";
import {ConversationService} from "../_services/conversation.service";
import {Conversation} from "../_models/Conversation";
import {MessageService} from "../_services/message.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userSearchControl: FormControl<string> = new FormControl();

  filteredUsers: ChatUser[] = [];

  currentConversation: number = 0;
  currentUser: string = '';
  newMessage: string = '';

  conversations: Conversation[] = [];

  constructor(private router: Router, private dialog: MatDialog,
              private webSocketService: WebsocketService,
              private userService: UserService,
              private changeDetectorRef: ChangeDetectorRef,
              private conversationService: ConversationService,
              private messageService: MessageService
  ) {
    this.userSearchControl.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(searchTerm => {
      this.searchUsers(searchTerm);
    })
  }

  ngOnInit() {
    this.conversationService.getConversations().subscribe(response => {
      console.log(response);

      response.map(conversation => {
        this.currentConversation = conversation.id;
        this.messageService.getMessages(conversation.id).subscribe(messageList => {
          conversation.messages = messageList;
          this.changeDetectorRef.detectChanges();
        });
        this.conversations.push(conversation);
      })
      this.changeDetectorRef.detectChanges();
    });


    //todo: do rozkminienia czemu w to nie wchodzi
    this.webSocketService.messages.subscribe(map => {
      console.log("im here bro ")
        map.forEach((value:Message[], key:number) => {
          this.conversations.find(conversation => conversation.id === key)?.messages.push(...value);
          console.log('appended new messages to conversation');
          console.log(this.conversations.find(conversation => conversation.id == key));
          this.changeDetectorRef.detectChanges();
        });
      }
    );

  }

  logout() {
    // Logika wylogowania użytkownika
  }

  goToCanvas() {
    this.router.navigate(['/canvas']);
  }

  selectUser(user: ChatUser) {
    this.currentUser = user.id;
    this.currentConversation = 0;
  }

  selectConversation(conversationId: number) {
    this.currentConversation = conversationId;
    this.currentUser = '';
  }

  sendMessage(conversationId: number | null) {
    // if (this.newMessage) {
    //   this.messages.push({ sender: this.currentUser, text: this.newMessage });
    //   this.newMessage = '';
    // }
    let mess: Message = {
      sender: localStorage.getItem('id')!,
      text: this.newMessage,
      receiver: conversationId ? null : this.currentUser,
      date: new Date(),
      conversation: conversationId ? conversationId : null
    }
    this.webSocketService.sendMessage(mess);
  }

  openToSettings() {
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '400px',
      data: {} // Możesz przekazać dane do dialogu, jeśli jest to potrzebne
    });
  }

  openToAddFrined() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
      height: '220px',
      data: {} // Możesz przekazać dane do dialogu, jeśli jest to potrzebne
    });
  }

  searchUsers(searchTerm: string) {
    if (searchTerm != null && searchTerm.length > 1)
      this.userService.getFilteredUsers(searchTerm).subscribe(response => {
          this.filteredUsers = response;
        }
      );

  }

  openCreateGroup() {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '400px',
      height: '350px',
      data: {} // Możesz przekazać dane do dialogu, jeśli jest to potrzebne
    });
  }

  protected readonly localStorage = localStorage;

  getMessages(): Message[] | undefined {
    return this.conversations.find(conversation => conversation.id == this.currentConversation)?.messages;
  }
}
