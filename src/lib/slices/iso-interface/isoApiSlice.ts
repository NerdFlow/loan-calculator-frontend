import { apiSlice } from "../apiSlice";

export const isoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // function for makeing post iso packages call
    addIsoPackages: builder.mutation({
      query: (data) => ({
        url: "/customer/packages/store",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// exporint the functions from iso api slice
export const { useAddIsoPackagesMutation } = isoApiSlice;
