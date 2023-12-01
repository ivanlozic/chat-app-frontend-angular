import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent {
  messages: string[] = [];
  text: string = '';

  sendMessage() {
    if (this.text.trim() !== '') {
      this.messages.push(this.text);
      this.text = '';
    }
  }
  onEnterPress() {
    this.sendMessage();
  }
}
