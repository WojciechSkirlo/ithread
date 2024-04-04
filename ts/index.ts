export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'friend';
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm extends SignInForm {
  username: string;
  confirm_password: string;
}
