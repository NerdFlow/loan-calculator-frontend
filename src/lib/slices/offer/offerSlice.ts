import { IIisoPackage } from "@/app/customer/offer/[id]/page";
import { createSlice } from "@reduxjs/toolkit";

// setting up the initial state
const initialState: {
  selectedPackage: IIisoPackage | null;
  packages: IIisoPackage[];
} = {
  selectedPackage: null,
  packages: [],
};

// creating the authentication slice and reducer functions
const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    // set customer selected package
    setCustomerSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload;
    },
    setAllCustomerPackages: (state, action) => {
      state.packages = action.payload;
    },
  },
});

export const { setAllCustomerPackages, setCustomerSelectedPackage } =
  offerSlice.actions;
export default offerSlice.reducer;
