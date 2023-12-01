import { Component } from '@angular/core';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss',
})
export class FriendListComponent {
  friends = [
    { id: 1, name: 'Friend 1' },
    { id: 2, name: 'Friend 2' },
    { id: 3, name: 'Friend 3' },
  ];

  selectFriend(friend: any) {}
}
