import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent {
  text: string = '';
  selectedFriend: any;

  onFriendSelected(friend: any) {
    this.selectedFriend = friend;
  }

  sendMessage() {
    if (this.text.trim() !== '' && this.selectedFriend) {
      this.selectedFriend.messages.push({ content: this.text, sent: true });
      this.text = '';
    }
  }
  onEnterPress() {
    this.sendMessage();
  }
}
