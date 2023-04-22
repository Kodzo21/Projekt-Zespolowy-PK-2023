import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./auth/register/register.component";
import {CanvasComponent} from "./canvas/canvas.component";

const routes: Routes = [
  {path: 'register' ,component:  RegisterComponent},
  {path: 'canvas' ,component:  CanvasComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
