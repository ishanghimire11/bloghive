import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ICurrentUser, UserState } from "@/types/types";

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
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = null;
      if (action.payload) {
        state.currentUser = action.payload as unknown as ICurrentUser;
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = null;
      if (action.payload) {
        state.currentUser = action.payload as unknown as ICurrentUser;
      }
    },
    updateFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.error = null;
      state.loading = false;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
