import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Friend, User } from '../../../shared/models/user.model';
import { FriendService } from '../../../services/friend.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../auth/auth.actions';

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

  constructor(private friendService: FriendService, private store: Store) {}

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
          (updatedUser: User) => {
            this.store.dispatch(
              AuthActions.updateUserData({ user: updatedUser })
            );
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
          (updatedUser: User) => {
            this.store.dispatch(
              AuthActions.updateUserData({ user: updatedUser })
            );
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
    this.loading = true;

    const currentUsername = this.user!.username;

    this.friendService
      .rejectFriendRequest(currentUsername, friend.username)
      .subscribe(
        (response: any) => {
          console.log('Friend request rejected successfully:', response);
        },
        (error: any) => {
          console.error('Error rejecting friend request:', error);
        }
      )
      .add(() => {
        this.loading = false;
      });
  }

  selectFriend(friend?: Friend) {
    this.selectedFriend = friend;
    this.friendSelected.emit(friend);
  }
}
