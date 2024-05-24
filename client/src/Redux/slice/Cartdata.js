import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk to fetch cart data from the API
export const getCartData = createAsyncThunk("cart/getCartData", async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await axios.get("http://localhost:4000/api/v1/getcartdata", {
      headers: {
        Authorization: `Bearer ${token}`, // Assuming a Bearer token
        "Content-Type": "application/json",
      },
    });

    const cartData = response.data;
    console.log(cartData);
    return cartData; // Return only the Cart data from the response
  } catch (error) {
     console.log(error) // Let the rejected state handle the error
  }
});

// Define the cart slice
export const cartdataSlice = createSlice({
  name: "cartData",
  initialState: {
    items: [],
    status: 'loading',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.items.push(action.payload);
        state.items = action.payload; // Set the cart items to the data fetched from the API
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Set the error message
      });
  },
});

export default cartdataSlice.reducer;
