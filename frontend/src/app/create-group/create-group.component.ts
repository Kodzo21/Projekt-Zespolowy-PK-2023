import {Component, Inject} from '@angular/core';
import {Conversation} from "../_models/Conversation";
import {UserService} from "../_services/user.service";
import {ConversationService} from "../_services/conversation.service";
import {FormControl} from "@angular/forms";
import {BehaviorSubject, debounceTime, Observable} from "rxjs";
import {UserSelect} from "../_models/userSelect";
import {ChatUser} from "../_models/ChatUser";
import {GroupRequest} from "../_models/GroupRequest";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {

  filteredUser : UserSelect={} as UserSelect;
  selectedUsers: UserSelect[]  = [];
  filteredUsers: ChatUser[] = [];
  name: string = '';
  userSearchControl: FormControl<string> = new FormControl();

  constructor(private userService:UserService
  ,private conversationService:ConversationService,
  @Inject(MAT_DIALOG_DATA) public data:any,
              public matDialogRef:MatDialogRef<CreateGroupComponent>
  ) {
    this.userSearchControl.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(searchTerm => {
      this.searchUsers(searchTerm);
    })
  }


  toggleUserSelection(user: UserSelect) {
    user.selected = !user.selected;
    if (user.selected) {
      let x: UserSelect = {
        id: user.id,
        name: user.name,
        selected: user.selected
      }
      this.selectedUsers.push(x);
    } else {
      this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id);
    }
  }

  createGroup() {
    //#todo dorobic na backend
    // Tworzenie grupy na podstawie zaznaczonych użytkowników
    // Możesz zaimplementować odpowiednią logikę tutaj

    let conversation: GroupRequest = {
      name: this.name,
      participants: this.selectedUsers.map(u => u.id),
    }
    if (conversation.participants.length > 2) {

      let behav : BehaviorSubject<Conversation>  = this.data.obsNum;

      this.conversationService.createConversation(conversation).subscribe(response => {
          behav.next(response);
        }
      );
      this.matDialogRef.close();
    }


  }

  selectUser(value: string) {
    let name = value.split('/')[0];
    let id = value.split('/')[1];
    this.filteredUser.name = name
    this.filteredUser.id = id;
    this.filteredUser.selected = false;
    this.toggleUserSelection(this.filteredUser);
  }

  searchUsers(searchTerm: string) {
    if (searchTerm != null && searchTerm.length > 1)
      this.userService.getFilteredUsers(searchTerm).subscribe(response => {
          this.filteredUsers = response;
        }
      );
  }
}
