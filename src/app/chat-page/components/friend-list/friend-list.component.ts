import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss',
})
export class FriendListComponent {
  @Input() user: User | null = null;
  @Output() friendSelected = new EventEmitter<any>();
  selectedFriend: any;
  searchText: string = '';
  newFriendName: string = '';

  ngOnInit() {
    this.selectFriend(this.user?.friends[0]);
  }

  selectFriend(friend: any) {
    this.selectedFriend = friend;
    this.friendSelected.emit(friend);
  }
}
