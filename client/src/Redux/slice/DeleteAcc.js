import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk to fetch cart data from the API
export const deleteuser = createAsyncThunk(
  "deleteuser",
  async () => {
    try {
      const token = localStorage.getItem('token');
          const response = await axios.delete(`http://localhost:4000/api/v1/deleteuser`,{
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
export const deleteuserSlice = createSlice({
  name: "cart",
  initialState: {status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteuser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Set the error message
      });
  }
});

// Export the reducer
export default deleteuserSlice.reducer;
 