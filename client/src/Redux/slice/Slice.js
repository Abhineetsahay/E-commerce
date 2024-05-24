import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postCartData = createAsyncThunk(
  "api/v1/cartdata",
  async (cartItem, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      // console.log(token);
      const response = await axios.post("http://localhost:4000/api/v1/addcartdata", cartItem,{
        headers: {
          'Authorization': `Bearer ${token}`,  // Assuming a Bearer token
          'Content-Type': 'application/json'
        }
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: null, error: null }, // Ensure initialState has items as an array
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postCartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(postCartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
