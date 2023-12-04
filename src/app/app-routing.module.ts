import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { ROUTES } from './app.constants';

export const routes: Routes = [
  { path: ROUTES.HOME, component: HomePageComponent },
  { path: ROUTES.CHAT, component: ChatPageComponent },
  { path: ROUTES.EDIT_PROFILE, component: EditProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
