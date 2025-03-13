import { User } from './user';

export interface Message {
  _id: string;
  senderId: User;
  receiverId: string;
  message: string;
  createdAt: string;
}
