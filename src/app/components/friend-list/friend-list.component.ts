import { Component, EventEmitter, Output } from '@angular/core';

interface Friend {
  id: number;
  name: string;
  messages: string[];
}
@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss',
})
export class FriendListComponent {
  friends: Friend[] = [
    { id: 1, name: 'Friend 1', messages: [] },
    { id: 2, name: 'Friend 2', messages: [] },
    { id: 3, name: 'Friend 3', messages: [] },
  ];
  @Output() friendSelected = new EventEmitter<any>();
  selectedFriend: any;
  searchText: string = '';
  newFriendName: string = '';

  ngOnInit() {
    this.selectFriend(this.friends[0]);
  }

  selectFriend(friend: any) {
    this.selectedFriend = friend;
    this.friendSelected.emit(friend);
  }

  addFriend() {
    if (
      this.newFriendName.trim() !== '' &&
      !this.friends.some((friend) => friend.name === this.newFriendName)
    ) {
      const newFriend: Friend = {
        id: this.friends.length + 1,
        name: this.newFriendName,
        messages: [],
      };
      this.friends.push(newFriend);
      this.newFriendName = '';
    }
  }
}
