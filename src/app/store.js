import {configureStore} from '@reduxjs/toolkit'
import todosReducer from '../features/todos/todosSlice'
import {apiSlice} from '../features/api/apiSlice'

export default configureStore({
  reducer: {
    todos: todosReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})
