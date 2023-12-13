import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/models/user.model';

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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser();
  }
  openEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  insertEmoji(emoji: string) {
    this.text += emoji;
  }

  onFriendSelected(friend: any) {
    this.selectedFriend = friend;
  }
  sendMessage() {
    if (this.text.trim() !== '') {
      this.sendingMessage = true;
      setTimeout(() => {
        this.selectedFriend.messages.push({
          content: this.text,
          sent: true,
          timestamp: new Date(),
        });
        this.text = '';
        this.sendingMessage = false;
        this.isFriendTyping = true;

        setTimeout(() => {
          this.receiveRandomResponse();
        }, 2000);
      }, 2000);
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
