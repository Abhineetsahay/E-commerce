import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk Action
export const postSigninData = createAsyncThunk(
  'api/v1/postSigninData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.URL}/Signin`, data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      return response.data;
      // return result;
    } catch (error) {
      
      console.log(error);
      // Return custom error message using rejectWithValue
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
export const ApiSlice = createSlice({
  name: "api",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },        
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSigninData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postSigninData.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(postSigninData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

// Export reducer
export default ApiSlice.reducer;
