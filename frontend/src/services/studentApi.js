import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://student-management-system-wt9p.onrender.com/",
  }),
  tagTypes: ["Students"],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/student",
      providesTags: ["Students"],
    }),

    // add student
    postStudent: builder.mutation({
      query: (student) => ({
        url: "/student",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),

    // update student
    updateStudent: builder.mutation({
      query: ({ id, ...student }) => ({
        url: `/student/${id}`,
        method: "PATCH",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),

    // delete student
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),

    // search student
    getStudentBySearch: builder.query({
      query: (search) => `/student/search${search}`,
      providesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  usePostStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useGetStudentBySearchQuery,
} = studentApi;
