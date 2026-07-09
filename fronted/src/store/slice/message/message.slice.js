import { createSlice } from "@reduxjs/toolkit";
import { sendMessageThunk, getMessageThunk } from "./message.thunk";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    screenLoading: false,
    buttonLoading: false,
  },
  reducers: {
    setNewMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.messages = [
        ...state.messages,
        action.payload.responseData.newMessage,
      ];
    });
    builder.addCase(sendMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    builder.addCase(getMessageThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.messages = action.payload.responseData.messages;
    });
    builder.addCase(getMessageThunk.rejected, (state) => {
      state.screenLoading = false;
    });
  },
});

export const { setNewMessage } = messageSlice.actions;
export default messageSlice.reducer;
