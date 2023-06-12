import {ChatUser} from "./ChatUser";
import {Message} from "./message";

export interface Conversation {
  id: number;
  name: string;
  participants: ChatUser[];
  messages: Message[];
}
