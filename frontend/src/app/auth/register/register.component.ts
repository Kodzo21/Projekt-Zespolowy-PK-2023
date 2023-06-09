import { Component } from '@angular/core';
import {User} from "../../_models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";

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
    private userService: AuthService
  )
  {
    this.user = new User();
  }

  onSubmit() {
    this.userService.save(this.user).subscribe(response =>{

      console.log(response);
      localStorage.setItem('token',response.token );
      localStorage.setItem('refreshToken',response.refreshToken );
      localStorage.setItem('id',response.uniqueId );
      this.router.navigate(['/chat']);
    });
  }
}
