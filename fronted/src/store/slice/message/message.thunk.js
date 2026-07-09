import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { AxiosInstance } from "../../../components/utility/AxiosInstance.utlity";

export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ message, receiverId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        `/users/send-message/${receiverId}`,
        { message },
      );
      toast.success("Message sent successfully!");
      return response.data;
    } catch (err) {
      console.log(err);
      const errOutput = err.response.data.message;
      toast.error(errOutput);
      return rejectWithValue(errOutput);
    }
  },
);

export const getMessageThunk = createAsyncThunk(
  "message/get",
  async (receiverId, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `/users/get-messages/${receiverId}`,
      );
      return response.data;
    } catch (err) {
      console.log(err);
      const errOutput = err.response.data.message;
      toast.error(errOutput);
      return rejectWithValue(errOutput);
    }
  },
);
