import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { RouterModule } from '@angular/router';
import {  HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginFormComponent,
    ChatPageComponent,
    RegisterModalComponent,
    FriendListComponent,
    EditProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
   
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
