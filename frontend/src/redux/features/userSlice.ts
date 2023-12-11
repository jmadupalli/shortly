import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserState = {
  firstName: string;
  lastName: string;
  jwtToken: string;
};

const getInitialState = () => {
  const storedState = localStorage.getItem("userState");
  return storedState ? (JSON.parse(storedState) as UserState) : null;
};

export const userSlice = createSlice({
  name: "user",
  initialState: getInitialState,
  reducers: {
    login: (_, action: PayloadAction<UserState>) => {
      return { ...action.payload };
    },
    logout: () => null,
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
