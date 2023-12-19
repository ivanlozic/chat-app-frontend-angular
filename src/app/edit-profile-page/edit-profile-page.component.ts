import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {
  user: User = {
    id: 1,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    mobileNumber: '',
    receivedFriendRequests: [],
    friends: [],
  };

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const authenticatedUser = this.authService.getAuthenticatedUser();

    if (authenticatedUser) {
      this.user = { ...authenticatedUser };
    }
  }

  onSubmit() {
    this.userService.updateUserProfile(this.user).subscribe(
      (response: any) => {
        console.log('Profile updated successfully:', response);
      },
      (error: any) => {
        console.error('Error updating profile:', error);
      }
    );
  }
}
