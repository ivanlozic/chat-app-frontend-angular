import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Friend, User } from '../../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { FriendService } from '../../../services/friend.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss',
})
export class FriendListComponent {
  public loading: boolean = false;
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
    this.loading = true;

    const isFriendAlreadyAdded = this.user?.friends?.some(
      (friend: any) => friend.username === this.newFriendName
    );

    if (!isFriendAlreadyAdded) {
      const currentUsername = this.user!.username;

      this.friendService
        .sendFriendRequest(currentUsername, this.newFriendName)
        .subscribe(
          (response: any) => {
            console.log('Friend request sent successfully:', response);
          },
          (error: any) => {
            console.error('Error sending friend request:', error);
          }
        )
        .add(() => {
          this.loading = false;
        });
    } else {
      console.log('Friend is already in the friends array.');
      this.loading = false;
    }
  }

  acceptFriendRequest(friend: Friend) {
    this.loading = true;

    const isFriendAlreadyAdded = this.user?.friends?.some(
      (friend: any) => friend.username === this.newFriendName
    );

    if (!isFriendAlreadyAdded) {
      const currentUsername = this.user!.username;

      this.friendService
        .addFriend(currentUsername, friend.username)
        .subscribe(
          (response: any) => {
            console.log('Friend added successfully:', response);
          },
          (error: any) => {
            console.error('Error adding friend:', error);
          }
        )
        .add(() => {
          this.loading = false;
        });
    } else {
      console.log('Friend is already in the friends array.');
      this.loading = false;
    }
  }

  rejectFriendRequest(friend: Friend) {
    console.log('Rejected friend request from:', friend);
  }

  selectFriend(friend?: Friend) {
    this.selectedFriend = friend;
    this.friendSelected.emit(friend);
  }
}
