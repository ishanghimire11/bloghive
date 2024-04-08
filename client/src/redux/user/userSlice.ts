import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserSignIn, UserState } from "@/types/types";

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<UserSignIn>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action: PayloadAction<UserSignIn>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStart, loginFailure, loginSuccess, logout } =
  userSlice.actions;

export default userSlice.reducer;
