import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// setting the base url domain for apis
const baseQuery = fetchBaseQuery({
  baseUrl: "https://ccs.nerdflow.tech/api",
});
// creating the base api slice
export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
