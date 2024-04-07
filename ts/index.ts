export interface Statement {
  message: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
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
