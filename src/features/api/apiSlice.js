import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from "../../constants";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  tagTypes: ['Todo'],
  endpoints: builder => ({
    getTodos: builder.query({
      query: (params) => ({
        url: '/todos/',
        params: params,
      }),
      providesTags: ['Todo']
    }),
    getTodo: builder.query({
      query: todoId => `/todos/${todoId}/`
    }),
    addNewTodo: builder.mutation({
      query: initialTodo => ({
        url: '/todos/',
        method: 'POST',
        body: initialTodo
      }),
      invalidatesTags: ['Todo']
    })
  })
})

export const {useGetTodosQuery, useGetTodoQuery, useAddNewTodoMutation} = apiSlice
