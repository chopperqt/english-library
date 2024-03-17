import { createSlice, createSelector } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@services/stores";

export interface UserState {
  avatarUrl: string;
  email: string;
  id: string;
  role: string;
}

const initialState: UserState = {
  id: "",
  role: "",
  email: "",
  avatarUrl: "",
};

const UserStore = createSlice({
  name: "UserStore",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { id, email, role, avatarUrl } = action.payload;

      state.avatarUrl = avatarUrl;
      state.email = email;
      state.role = role;
      state.id = id;
    },
    clearUser: (state) => {
      state.avatarUrl = "";
      state.email = "";
      state.role = "";
      state.id = "";
    },
  },
});

export const { setUser, clearUser } = UserStore.actions;

export const getUser = createSelector(
  (state: RootState) => state.UserStore,
  (user) => user
);

export const getUserID = createSelector(
  (state: RootState) => state.UserStore,
  (user) => user.id
);

export default UserStore.reducer;
