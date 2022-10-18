import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from "../../constants";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  endpoints: builder => ({
    getTodos: builder.query({
      query: (params) => ({
        url: '/todos/',
        params: params,
      })
    }),
    getTodo: builder.query({
      query: todoId => `/todos/${todoId}/`
    }),
    addNewTodo: builder.mutation({
      query: initialTodo => ({
        url: '/todos/',
        method: 'POST',
        body: initialTodo
      })
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {useGetTodosQuery, useGetTodoQuery} = apiSlice
