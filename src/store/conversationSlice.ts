import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversation: null,
  conversations: [],
  messages: [],
  timestamp: 0
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
    }
  },
});

export const { setConversation, setConversations, setMessages, setTimestamp } = conversationSlice.actions;
export default conversationSlice.reducer;