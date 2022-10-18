import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from "../../constants";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  tagTypes: ['Todo'],
  // TODO: check tags dependencies
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
      invalidatesTags: ['TodoList']
    }),
    editTodo: builder.mutation({
      query: ({todoId, todoData}) => ({
        url: `/todos/${todoId}/`,
        method: 'PATCH',
        body: todoData
      }),
      invalidatesTags: ['TodoDetail']
    }),
  })
})

export const {useGetTodosQuery, useGetTodoQuery, useAddNewTodoMutation, useEditTodoMutation} = apiSlice
