import { apiSlice } from "../apiSlice";

export const offerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // function for getting iso packages for customers
    getCustomerIsoPackages: builder.query({
      query: (customerId) => ({
        url: `/customer/packages/${customerId}/retrieve`,
      }),
    }),
  }),
});

// exporint the functions from iso api slice
export const { useGetCustomerIsoPackagesQuery } = offerApiSlice;
