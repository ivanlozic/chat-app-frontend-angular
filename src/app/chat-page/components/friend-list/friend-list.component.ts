import { Component, EventEmitter, Input, Output,SimpleChanges } from '@angular/core';
import { Friend, User } from '../../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { FriendService } from '../../../services/friend.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss',
})
export class FriendListComponent implements  OnChanges{
  public loading: boolean = false;
  @Input() user: User | null = null;
  @Output() friendSelected = new EventEmitter<any>();
  selectedFriend: any;
  searchText: string = '';
  newFriendName: string = '';

  constructor(private http: HttpClient, private friendService: FriendService) {}

  ngOnChanges(changes: SimpleChanges) {

    if (changes.user && changes.user.currentValue) {
    
      console.log('User changed:', changes.user.currentValue);
 
    }
  }

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

      this.friendService.addFriend(currentUsername, this.newFriendName).subscribe(
        (response: any) => {
          console.log('Friend added successfully:', response);
        },
        (error: any) => {
          console.error('Error adding friend:', error);
        }
      ).add(() => {
        this.loading = false;
      });
    } else {
      console.log('Friend is already in the friends array.');
      this.loading = false; 
    }
  }
  selectFriend(friend?: Friend) {
    this.selectedFriend = friend;
    this.friendSelected.emit(friend);
  }
}
