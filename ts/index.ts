export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'friend';
}
