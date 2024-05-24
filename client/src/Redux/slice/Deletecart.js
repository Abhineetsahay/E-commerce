import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk to fetch cart data from the API
export const deleteCartData = createAsyncThunk(
  "cart/deletecartdata",
  async (Cartid) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:4000/api/v1/deletecartdata/${Cartid._id}`,{
            headers: {
              'Authorization': `Bearer ${token}`,  // Assuming a Bearer token
              'Content-Type': 'application/json'
            }
          });
          return response.data.Cart; // Return only the Cart data from the response
    } catch (error) {
      throw error; // Let the rejected state handle the error
    }
  }
);

// Define the cart slice
export const DeleteCartdataSlice = createSlice({
  name: "cart",
  initialState: {status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(deleteCartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Set the error message
      });
  }
});

// Export the reducer
export default DeleteCartdataSlice.reducer;
