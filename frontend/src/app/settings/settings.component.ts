import {Component} from "@angular/core";
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  email: string = '';
  password: string = '';
  photo: string = '';
  newPassword: string ='';
  currentPassword: string ='';
  newEmail: string = '';

  changeEmail() {
    // Logika zmiany maila
  }

  changePassword() {
    // Logika zmiany hasła
  }

  deleteAccount() {
    // Logika usuwania konta
  }

  setPhoto() {
    // Logika ustawiania zdjęcia
  }

  onFileSelected($event: Event) {

  }

  uploadPhoto() {

  }
}
