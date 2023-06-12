import {Component} from "@angular/core";
import {UserService} from "../_services/user.service";
import {AuthService} from "../_services/auth.service";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  email: string = '';
  password: string = '';
  newPassword: string ='';
  currentPassword: string ='';
  newEmail: string = '';


  messageEmail:string|undefined;
  messagePassword:string|undefined;
  messageDelete:string|undefined;

  constructor(private userService: UserService,private authService:AuthService) {

  }

  changeEmail() {
    this.userService.setNewEmail(this.newEmail).subscribe(

      response => {
        console.log(response);
        console.log('Email changed successfully');
        this.messageEmail = response.message;
      },
      error => {
        console.error('Failed to change email:', error);
      }
    );
  }


  changePassword() {
    this.userService.setNewPassword(this.currentPassword, this.newPassword).subscribe(
    response => {
        console.log('Password changed successfully');
        this.messagePassword = response.message;
        },
    error => {
    console.error('Failed to change password:', error);
    }
    );
  }


deleteAccount() {
    this.userService.deleteAccount().subscribe(
      response => {

        console.log('Account deleted successfully');
        this.messageDelete = response.message;
        this.authService.logout();
      },
      error => {
        console.error('Failed to delete account:', error);
      }
    );
  }
}
