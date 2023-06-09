export interface Message {
  sender: string;
  conversation: number|null;
  receiver: string;
  text: string;
  date: Date;
}
