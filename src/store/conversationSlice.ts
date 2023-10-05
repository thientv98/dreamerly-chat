import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversation: null,
  conversations: [],
  messages: [],
  timestamp: 0,
  timestampConversations: 0,
  channel: null,
  channelOnline: null
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversation: (state, action) => {
      state.conversation = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setTimestamp: (state, action) => {
      state.timestamp = action.payload;
    },
    setTimestampConversations: (state, action) => {
      state.timestampConversations = action.payload;
    },
    setChannel: (state, action) => {
      state.channel = action.payload;
    },
    setChannelOnline: (state, action) => {
      state.channelOnline = action.payload;
    }
  },
});

export const { setConversation, setConversations, setMessages, setTimestamp, setTimestampConversations, setChannel, setChannelOnline } = conversationSlice.actions;
export default conversationSlice.reducer;