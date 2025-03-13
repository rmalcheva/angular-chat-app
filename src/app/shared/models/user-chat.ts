import { User } from './user';

export interface UserChat {
  userData: User;
  lastMessage: string;
  lastMessageTimestamp: string;
}
