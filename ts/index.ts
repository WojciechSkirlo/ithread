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
}

export interface Message {
  _id: string;
  text: string;
  sender: any;
  receiver: any;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  participants: User[];
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm extends SignInForm {
  name: string;
  confirm_password: string;
}
