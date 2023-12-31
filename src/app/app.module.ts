import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './home-page/components/login-form/login-form.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { RegisterModalComponent } from './home-page/components/login-form/components/register-modal/register-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FriendListComponent } from './chat-page/components/friend-list/friend-list.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './core/components/spinner/spinner.component';
import { authReducer } from './auth/auth.reducers';
import { ConfirmationModalComponent } from './core/components/confirmation-modal/confirmation-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginFormComponent,
    ChatPageComponent,
    RegisterModalComponent,
    FriendListComponent,
    EditProfilePageComponent,
    SpinnerComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
