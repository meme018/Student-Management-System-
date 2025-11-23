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
  }),
});

export const { useGetStudentsQuery } = studentApi;
