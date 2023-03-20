import { Component } from '@angular/core';
import {User} from "../../_models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  )
  {
    this.user = new User();
  }

  onSubmit() {
    this.userService.save(this.user).subscribe(response => console.log(response));
  }
}
