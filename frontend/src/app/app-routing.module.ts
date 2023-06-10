import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./auth/register/register.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {LoginComponent} from "./auth/login/login.component";
import {ChatComponent} from "./chat/chat.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {path: 'register' ,component:  RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'canvas' ,component:  CanvasComponent},
  {path: 'chat',component:ChatComponent},
  {path: '',component:LoginComponent}

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
