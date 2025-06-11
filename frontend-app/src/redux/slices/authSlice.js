import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAdmin: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAdmin = action.payload.role === 'admin';
    },
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
