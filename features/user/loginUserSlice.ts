import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import type { RootState } from "../../app/store";
import { loginUser } from "../../services/userServices";

interface Props {
  valueLogin: number | string;
  password: string;
}

// here we are typing the types for the state
export type KanyeState = {
  data: {
    token: string;
    account: {
      groupWithRoles: number;
      email: string;
      username: string;
    };
  };
  pending: boolean;
  error: boolean;
  isAuthenticated: boolean;
};

const initialState: KanyeState = {
  data: {
    token: "",
    account: {
      groupWithRoles: 0,
      email: "",
      username: "",
    },
  },
  pending: false,
  error: false,
  isAuthenticated: false,
};

// This action is what we will call using the dispatch in order to trigger the API call.
export const handleLoginUser = createAsyncThunk(
  "loginUser/getLoginUser",
  async ({ valueLogin, password }: Props) => {
    const response = await loginUser(valueLogin, password);
    console.log("responseRedux", response);
    return response.data;
  }
);

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    // leave this empty here
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices.
  // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes.
  // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginUser.pending, (state) => {
        state.pending = true;
        state.isAuthenticated = false;
      })
      .addCase(handleLoginUser.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.pending = false;
        state.data = payload;
        state.isAuthenticated = true;
      })
      .addCase(handleLoginUser.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.isAuthenticated = false;
      });
  },
});

export const selectLoginUser = (state: RootState) => state.loginUser;

export default loginUserSlice.reducer;