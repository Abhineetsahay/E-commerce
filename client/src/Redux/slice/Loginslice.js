import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk Action
export const postLoginData = createAsyncThunk(
  'api/v1/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.URL}/login`, data);
      // console.log(response.data);  // Log response data for debugging
      const result=response.data;
      const {token}=result;
      localStorage.setItem("token",token);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
export const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },        
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLoginData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postLoginData.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(postLoginData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

// Export reducer
export default LoginSlice.reducer;
