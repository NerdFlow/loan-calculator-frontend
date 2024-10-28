import { apiSlice } from "../apiSlice";

export const submissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // function for getting iso packages for customers
    getSubmissions: builder.query({
      query: () => ({
        url: `/customer/submissions/list`,
      }),
      providesTags: ["Submissions"],
    }),
    deleteSubmission: builder.mutation({
      query: (submissionId) => ({
        url: `/customer/submissions/delete/${submissionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Submissions"],
    }),
  }),
});

// exporint the functions from iso api slice
export const { useGetSubmissionsQuery, useDeleteSubmissionMutation } =
  submissionApiSlice;
