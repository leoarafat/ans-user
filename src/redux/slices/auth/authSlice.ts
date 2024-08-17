/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
};

type TAuthState = {
  user: null | TUser;
  accessToken: null | string;
  isVerified: null | boolean;
  subAdminDetails: any;
};

const initialState: TAuthState = {
  user: null,
  accessToken: null,
  subAdminDetails: null,
  isVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    setSubAdminDetails: (state, action) => {
      state.subAdminDetails = action.payload;
    },
    setIsVerified: (state, action) => {
      //   console.log(action);
      state.isVerified = action.payload?.isVerified;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logout, setSubAdminDetails, setIsVerified } =
  authSlice.actions;

export default authSlice.reducer;
//@ts-ignore
export const useCurrentAccessToken = (state: RootState) =>
  state.auth.accessToken;
//@ts-ignore
export const useCurrentUser = (state: RootState) => state.auth.user;
//@ts-ignore
export const useIsVerified = (state: RootState) => state.auth.isVerified;
