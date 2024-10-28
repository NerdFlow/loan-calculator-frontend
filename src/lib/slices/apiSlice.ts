import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// setting the base url domain for apis
const baseQuery = fetchBaseQuery({
  baseUrl: "https://ccs.nerdflow.tech/api",
  prepareHeaders: (headers, { getState }) => {
    // Access the auth state to retrieve the token
    const token = (getState() as RootState).auth?.userInfo?.token;

    // If a token exists, add it to the headers
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
// creating the base api slice
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Submissions"],
  endpoints: (builder) => ({}),
});
