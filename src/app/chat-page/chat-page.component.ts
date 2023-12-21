import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../auth/auth.reducers';
import { Message } from '../shared/models/message.model';
import { FriendService } from '../services/friend.service';
import * as AuthActions from '../auth/auth.actions';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  user: User | null = null;
  text: string = '';
  selectedFriend: any;
  isFriendTyping: boolean = false;
  showEmojiPicker: boolean = false;
  showDropdown: boolean = false;
  hasFriendRequest: boolean = false;
  sendingMessage: boolean = false;

  emojis: string[] = ['😊', '😂', '❤️', '👍', '🎉'];

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
    private friendService: FriendService
  ) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user: User | null) => {
      this.user = user;
    });
  }
  openEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  insertEmoji(emoji: string) {
    this.text += emoji;
  }

  onFriendSelected(friend: any) {
    this.selectedFriend = friend;
    console.log(this.selectedFriend);
  }
  sendMessage() {
    if (this.selectedFriend && Array.isArray(this.selectedFriend.messages)) {
      this.sendingMessage = true;

      const message: Message = {
        id: 1,
        content: this.text,
        timestamp: new Date(),
      };

      this.friendService
        .sendMessage(this.user!.username, this.selectedFriend.username, message)
        .subscribe(
          (updatedUser: User) => {
            this.text = '';
            this.sendingMessage = false;
            this.isFriendTyping = true;

            this.selectedFriend = updatedUser.friends.find(
              (friend) => friend.username === this.selectedFriend.username
            );
            this.store.dispatch(
              AuthActions.updateUserData({ user: updatedUser })
            );
          },
          (error) => {
            console.error('Error sending message:', error);
            this.sendingMessage = false;
          }
        );
    }
  }

  receiveRandomResponse() {
    const loremIpsum =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    const words = loremIpsum.split(' ');
    const randomWords = [];

    for (let i = 0; i < Math.floor(Math.random() * (10 - 5 + 1) + 5); i++) {
      randomWords.push(words[Math.floor(Math.random() * words.length)]);
    }

    this.selectedFriend.messages.push({
      content: randomWords.join(' '),
      sent: false,
      timestamp: new Date(),
    });
    this.isFriendTyping = false;
  }
  onEnterPress() {
    this.sendMessage();
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  openDropdown() {
    this.showDropdown = !this.showDropdown;
    console.log('Dropdown opened. showDropdown:', this.showDropdown);
  }

  openNotifications() {
    console.log('Notifications opened');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
