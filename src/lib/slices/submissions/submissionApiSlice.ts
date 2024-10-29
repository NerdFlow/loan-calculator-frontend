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
    downloadSubmissionDocument: builder.mutation({
      query: ({ customer_id, document_name }) => ({
        url: `/customer/submissions/download/document`,
        method: "POST",
        body: {
          customer_id,
          document_name,
        },
      }),
      invalidatesTags: ["Submissions"],
    }),
  }),
});

// exporint the functions from iso api slice
export const {
  useGetSubmissionsQuery,
  useDeleteSubmissionMutation,
  useDownloadSubmissionDocumentMutation,
} = submissionApiSlice;
