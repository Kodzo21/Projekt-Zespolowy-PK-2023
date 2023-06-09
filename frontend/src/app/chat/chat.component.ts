import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SettingsComponent} from "../settings/settings.component";
import {AddUserComponent} from "../add-user/add-user.component";
import {CreateGroupComponent} from "../create-group/create-group.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  users = [
    { name: 'User 1' },
    { name: 'User 2' },
    { name: 'User 3' }
  ];

  filteredUsers: any[] = [];

  messages = [
    { sender: 'User 1', text: 'Hello!' },
    { sender: 'User 2', text: 'Hi there!' }
  ];

  currentUser: string = '';
  newMessage: string = '';

  constructor(private router: Router,private dialog: MatDialog) {}

  ngOnInit() {
    this.filteredUsers = this.users;
  }

  logout() {
    // Logika wylogowania użytkownika
  }

  goToCanvas() {
    this.router.navigate(['/canvas']);
  }

  selectUser(user: any) {
    this.currentUser = user.name;
  }

  sendMessage() {
    if (this.newMessage) {
      this.messages.push({ sender: this.currentUser, text: this.newMessage });
      this.newMessage = '';
    }
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
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(this.currentUser.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
    }
  }

  openCreateGroup() {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '400px',
      height: '350px',
      data: {} // Możesz przekazać dane do dialogu, jeśli jest to potrzebne
    });
  }
}
