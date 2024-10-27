import { apiSlice } from "@/lib/slices/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // function for login request
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    logoutSession: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
    // method for getting current authenticated user
    getAuthUser: builder.mutation({
      query: () => ({
        url: "/user",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutSessionMutation,
  useGetAuthUserMutation,
} = authApiSlice;
