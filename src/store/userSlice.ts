import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  users: [],
  onlineUsers: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setUser, logout, setUsers, setOnlineUsers } = userSlice.actions;
export default userSlice.reducer;