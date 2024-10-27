import { createSlice } from "@reduxjs/toolkit";

// setting up the initial state
const initialState = {
  customer: {},
  selectedPackage: {},
};

// creating the authentication slice and reducer functions
const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    // set customer selected package
    setCustomerSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload;
    },
  },
});

export const { setCustomer, setCustomerSelectedPackage } = offerSlice.actions;
export default offerSlice.reducer;
