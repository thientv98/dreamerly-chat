import PresenceChannel from 'pusher-js/types/src/core/channels/presence_channel';
import PrivateChannel from 'pusher-js/types/src/core/channels/private_channel';

export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  lastActive?: number;
  unreadNotifications?: Array<string>
  online?: boolean;
  tokens?: Array<string>;
}

export type UserCreate = {
  email: string;
  name: string;
  avatar: string;
  lastActive?: number;
  unreadNotifications?: Array<string>
}

export type Conversation = {
  id: string;
  users: Array<string>;
  userData?: Array<UserChat>
  lastMessageTimestamp: number;
  lastMessage?: Message;
  seen?: { [key: string]: number }
}

export type UserChat = {
  userId: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export type Message = {
  id: string;
  senderId: string;
  content: string;
  type: string;
  timestamp: number;
}

export type MessageCreate = {
  senderId: string;
  content: string;
  type: string;
}


export interface PusherMemberType {
  id: string
}

interface UserState {
  user: User | null;
  users: User[],
  onlineUsers: Array<string>
}

interface ConversationState {
  conversation: Conversation,
  conversations: Conversation[],
  messages: Message[],
  timestamp: number,
  timestampConversations: number,
  channel: PrivateChannel,
  channelOnline: PresenceChannel,
}

export interface RootState {
  user: UserState;
  conversation: ConversationState
}