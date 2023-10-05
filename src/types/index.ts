export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  lastActive?: number;
  unreadNotifications?: Array<string>
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

interface UserState {
  user: User | null;
  users: User[]
}

interface ConversationState {
  conversation: Conversation,
  conversations: Conversation[],
  messages: Message[],
  timestamp: number
}

export interface RootState {
  user: UserState;
  conversation: ConversationState
}