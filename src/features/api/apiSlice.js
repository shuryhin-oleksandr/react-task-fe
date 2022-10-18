import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from "../../constants";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  endpoints: builder => ({
    getTodos: builder.query({
      query: () => '/todos/'
    }),
    getTodo: builder.query({
      query: todoId => `/todos/${todoId}/`
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {useGetTodosQuery, useGetTodoQuery} = apiSlice
