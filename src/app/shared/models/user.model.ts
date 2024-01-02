export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  mobileNumber: string;
  receivedFriendRequests: any[];
  friends: Friend[];
}

export interface Friend {
  id: number;
  username: string;
  messages: string[];
  pendingRequest: boolean;
}
