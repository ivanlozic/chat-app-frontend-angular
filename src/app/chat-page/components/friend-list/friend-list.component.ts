import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { FriendService } from '../../../services/friend.service';

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

  constructor(private http: HttpClient, private friendService: FriendService) {}

  ngOnInit() {
    this.selectFriend(this.user?.friends[0]);
  }

  addFriend() {
    const isFriendAlreadyAdded = this.user?.friends?.some(
      (friend: any) => friend.username === this.newFriendName
    );

    if (!isFriendAlreadyAdded) {
      const currentUsername = this.user!.username;
    
      this.friendService
        .addFriend(currentUsername, this.newFriendName)
        .subscribe(
          (response: any) => {
            // Handle the response if needed
            console.log('Friend added successfully:', response);
          },
          (error: any) => {
            console.error('Error adding friend:', error);
          }
        );
    } else {
      console.log('Friend is already in the friends array.');
    }
  }
  selectFriend(friend: any) {
    this.selectedFriend = friend;
    this.friendSelected.emit(friend);
  }
}
