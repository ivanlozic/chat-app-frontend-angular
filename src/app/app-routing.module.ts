import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component'; 
import { ChatPageComponent } from './chat-page/chat-page.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'chat', component: ChatPageComponent },
  { path: 'edit-profile', component: EditProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
