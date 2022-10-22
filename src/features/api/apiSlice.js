import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from "../../constants";


// Ask: From what I understand, create, update and remove should not update a whole list of todos from server.
// It will be strange, the user removes and item, but actually he sees new items in a list added by another
// users to the server in a meanwhile

// Ask: Let's say we are on a list page and press button to go to detail page. Should we take a value from
// the store or from the server in that case? I'd say take a value from the store to stay in sync with what
// user saw in the list page. From another side, if someone updated the same between list was loaded and
// button pressed, our user will se an outdated todoitem info.
// Another case if someone goes to an update page directly with link, to stay consistent we should load the
// whole list and only after that look for a specific todoitem. But we could have billions of them, and then
// we will download too much data from the server just to be sure, that we will find that todoitem in data.
// So we cannot just load all data on detail or update page.
// Another approach is to handle distinctly cases when store is empty or filled, i.e. user loaded page directly
// or by visiting a list page first. That will make a system inconsistent, so I ended with a separate request

// Ask: I can change the todo in the Redux store, but what if in a meanwhile somebody updated another todo?
// This way my todo list will be out of sync
// .addCase(TodoAPI.updateById.fulfilled, todosAdapter.setOne)

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
      providesTags: (result = [], error, arg) => [
        'Todo',
        ...result.results.map(({ id }) => ({ type: 'Todo', id }))
      ]
    }),
    getTodo: builder.query({
      query: todoId => `/todos/${todoId}/`,
      providesTags: (result, error, arg) => [{ type: 'Todo', id: arg }]
    }),
    // Ask: do we actually need it here? We can refetch list every time we go to list page
    addNewTodo: builder.mutation({
      query: initialTodo => ({
        url: '/todos/',
        method: 'POST',
        body: initialTodo
      }),
      invalidatesTags: ['Todo']
    }),
    // Ask: do we actually need it here? We can refetch to-do details every time we go to list page
    editTodo: builder.mutation({
      query: ({todoId, todoData}) => ({
        url: `/todos/${todoId}/`,
        method: 'PATCH',
        body: todoData
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }]
    }),
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: `/todos/${todoId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }]
    }),
  })
})

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddNewTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation
} = apiSlice
