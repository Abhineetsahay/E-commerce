import { configureStore } from "@reduxjs/toolkit";
// import { cartSlice } from "./slice/Slice";
import { ApiSlice } from "./slice/Api";
// import { reducer as ApiReducer } from "./slice/Api"; // rename if needed
import { cartdataSlice } from "./slice/Cartdata";
import { DeleteCartdataSlice } from "./slice/Deletecart";
import { deleteuserSlice } from "./slice/DeleteAcc";
import { LoginSlice } from "./slice/Loginslice";


export const store = configureStore({
  reducer: {
    // cart: cartSlice.reducer,
    Api: ApiSlice.reducer,
    Login:LoginSlice.reducer,
    CartData:cartdataSlice.reducer,
    DeleteData:DeleteCartdataSlice.reducer,
    Deleteuser:deleteuserSlice.reducer,
  }
});
