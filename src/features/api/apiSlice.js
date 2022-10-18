import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from "../../constants";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  tagTypes: ['Todo'],
  // Ask: is that correct tag dependencies? Should really addNewTodo untag TodoDetail?
  endpoints: builder => ({
    getTodos: builder.query({
      query: (params) => ({
        url: '/todos/',
        params: params,
      }),
      providesTags: ['TodoList']
    }),
    getTodo: builder.query({
      query: todoId => `/todos/${todoId}/`,
      providesTags: ['TodoDetail']
    }),
    addNewTodo: builder.mutation({
      query: initialTodo => ({
        url: '/todos/',
        method: 'POST',
        body: initialTodo
      }),
      invalidatesTags: ['TodoList', 'TodoDetail']
    }),
    editTodo: builder.mutation({
      query: ({todoId, todoData}) => ({
        url: `/todos/${todoId}/`,
        method: 'PATCH',
        body: todoData
      }),
      invalidatesTags: ['TodoList', 'TodoDetail']
    }),
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: `/todos/${todoId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TodoList', 'TodoDetail']
    }),
  })
})

export const {useGetTodosQuery, useGetTodoQuery, useAddNewTodoMutation, useEditTodoMutation} = apiSlice
