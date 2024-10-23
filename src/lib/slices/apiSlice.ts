import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// setting the base url domain for apis
const baseQuery = fetchBaseQuery({ baseUrl: process.env.BACKEND_BASE_URL });
// creating the base api slice
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({}),
});
