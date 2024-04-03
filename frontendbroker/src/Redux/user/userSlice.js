import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    signInSuccess: (state, action) => {
      state.user = action.payload
    },
  },
});

export const { signInSuccess } = userSlice.actions;
