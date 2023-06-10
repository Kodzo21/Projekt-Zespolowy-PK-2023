import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AuthModule} from "./auth/auth.module";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./_services/auth.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CanvasComponent } from './canvas/canvas.component';
import { ColorPickerComponent } from './canvas/color-picker/color-picker.component';
import { LineWidthPickerComponent } from './canvas/line-width-picker/line-width-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChatComponent} from "./chat/chat.component";
import {MatIconModule} from "@angular/material/icon";
import { SettingsComponent } from './settings/settings.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { AddUserComponent } from './add-user/add-user.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    AppComponent, ChatComponent,
    CanvasComponent,
    ColorPickerComponent,
    LineWidthPickerComponent,
    SettingsComponent,
    AddUserComponent,
    CreateGroupComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  providers: [AuthService, {provide:

  HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
