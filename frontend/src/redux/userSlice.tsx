import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

const initialState: UserState = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  createdAt: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.createdAt = action.payload.createdAt;
    },
    clearUser(state) {
      state.id = null;
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.createdAt = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;