import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "./postThunk";

interface logoutState {
  logoutSuccess: boolean;
  isLogout: boolean;
}

const logoutSlice = createSlice({
  name: "logout",
  initialState: {logoutSuccess: false, isLogout: false} as logoutState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(logoutThunk.fulfilled, (state) => {
      state.logoutSuccess = true
      state.isLogout = true
    })
    .addCase(logoutThunk.rejected, (state) => {
      state.logoutSuccess = false
      state.isLogout = false
    })
  }
});

export default logoutSlice.reducer
