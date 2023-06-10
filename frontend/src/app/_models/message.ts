export interface Message {
  sender: string;
  conversation: number|null;
  receiver: string|null;
  text: string;
  date: Date;
}
