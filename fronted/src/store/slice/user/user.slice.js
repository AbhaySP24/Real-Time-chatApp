import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserProfileThunk,
  getOtherUserThunk,
} from "./user.thunk";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    isAuthenticated: false,
    user: null,
    selectedUser: null,
    otherUsers: null,
    buttonLoading: false,
    authLoading: true,
    screenLoading: false,
  },

  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.responseData.user;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    builder.addCase(registerUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.responseData.newUser;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    builder.addCase(logoutUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.buttonLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.authLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.responseData.user;
    });
    builder.addCase(getUserProfileThunk.rejected, (state) => {
      state.authLoading = false;
    });

    builder.addCase(getOtherUserThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload.responseData.allUser;
    });
    builder.addCase(getOtherUserThunk.rejected, (state) => {
      state.screenLoading = false;
    });
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
