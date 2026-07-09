import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { AxiosInstance } from "../../../components/utility/AxiosInstance.utlity";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/auth/login", {
        email,
        password,
      });
      toast.success("Login successful!");
      return response.data;
    } catch (err) {
      console.log(err);
      const errOutput = err.response.data.message;
      toast.error(errOutput);
      return rejectWithValue(errOutput);
    }
  },
);

export const registerUserThunk = createAsyncThunk(
  "user/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      toast.success("Registration successful!");
      return response.data;
    } catch (err) {
      console.log(err);
      const errOutput = err.response.data.message;
      toast.error(errOutput);
      return rejectWithValue(errOutput);
    }
  },
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/auth/logout");
      toast.success("Logout successful!");
      return response.data;
    } catch (err) {
      console.log(err);
      const errOutput = err.response.data.message;
      toast.error(errOutput);
      return rejectWithValue(errOutput);
    }
  },
);

export const getUserProfileThunk = createAsyncThunk(
  "user/get-Profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/auth/get-profile");
      return response.data;
    } catch (err) {
      console.log(err);
      const errOutput =
        err.response?.data?.message || "Failed to fetch user profile";
      return rejectWithValue(errOutput);
    }
  },
);

export const getOtherUserThunk = createAsyncThunk(
  "user/getOtherUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/auth/other-users");
      return response.data;
    } catch (err) {
      console.log(err);
      const errOutput = err.response.data.message;
      toast.error(errOutput);
      return rejectWithValue(errOutput);
    }
  },
);
