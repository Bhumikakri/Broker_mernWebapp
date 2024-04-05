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
    updateuserSuccess: (state, action) => {
      state.user = action.payload
    },
    deleteuserSuccess: (state, action) => {
      state.user = action.payload
    },
  },
});

export const { signInSuccess, updateuserSuccess, deleteuserSuccess } = userSlice.actions;
