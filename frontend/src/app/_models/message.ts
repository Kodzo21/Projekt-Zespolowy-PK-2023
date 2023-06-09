export interface Message {
  sender: string;
  conversation: number;
  receiver: string;
  text: string;
  date: Date;
}
