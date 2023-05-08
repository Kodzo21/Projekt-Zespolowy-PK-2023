import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";

const routes: Routes = [
  {path: 'register' ,component:  RegisterComponent},
  {path: 'login', component:LoginComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
