export interface Statement {
  message: string;
}

export interface Resource<T> extends Statement {
  result: T;
}

export interface SimpleUser {
  _id: string;
  name: string;
  email: string;
}

export interface User extends SimpleUser {
  createdAt: string;
  friends: string[];
  friendRequests: string[];
  sentRequests: string[];
}

export interface Message {
  _id: string;
  text: string;
  senderId: string;
  conversationId: string;
  timestamp: string;
}

export interface Conversation {
  _id: string;
  participants: SimpleUser[];
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm extends SignInForm {
  name: string;
  confirm_password: string;
}
