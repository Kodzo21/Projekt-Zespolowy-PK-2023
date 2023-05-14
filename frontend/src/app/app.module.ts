import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AuthModule} from "./auth/auth.module";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./_services/user.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CanvasComponent } from './canvas/canvas.component';
import { ColorPickerComponent } from './canvas/color-picker/color-picker.component';
import { LineWidthPickerComponent } from './canvas/line-width-picker/line-width-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ColorPickerComponent,
    LineWidthPickerComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
