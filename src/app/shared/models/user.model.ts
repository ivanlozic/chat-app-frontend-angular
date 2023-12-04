export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  mobileNumber: string;
  friends: Friend[];
}

export interface Friend {
  id: number;
  username: string;
  messages: string[];
}
