export interface Statement {
  message: string;
}

export interface Resource<T> extends Statement {
  result: T;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  friends: string[];
  friendRequests: string[];
  sentRequests: string[];
  // friends: User[];
  // friendRequests: RequestUser[];
  // sentRequests: User[];
}

export interface RequestUser extends User {
  createdAt: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm extends SignInForm {
  name: string;
  confirm_password: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'friend';
}
