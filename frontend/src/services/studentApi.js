import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://student-management-system-wt9p.onrender.com/",
  }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/student",
    }),

    // add student
    postStudent: builder.mutation({
      query: (student) => ({
        url: "/student",
        method: "POST",
        body: student,
      }),
    }),
  }),
});

export const { useGetStudentsQuery, usePostStudentMutation } = studentApi;
