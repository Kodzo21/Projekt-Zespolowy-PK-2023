import { Component } from '@angular/core';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  users = [
    { name: 'User 1', selected: false },
    { name: 'User 2', selected: false },
    { name: 'User 3', selected: false }
  ];

  selectedUsers: any[] = [];

  toggleUserSelection(user: any) {
    user.selected = !user.selected;

    if (user.selected) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers = this.selectedUsers.filter(
        (selectedUser) => selectedUser !== user
      );
    }
  }

  createGroup() {
    //#todo dorobic na backend
    // Tworzenie grupy na podstawie zaznaczonych użytkowników
    // Możesz zaimplementować odpowiednią logikę tutaj
    console.log('Zaznaczeni użytkownicy:', this.selectedUsers);
  }
}
