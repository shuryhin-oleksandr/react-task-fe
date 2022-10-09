import {createSlice} from '@reduxjs/toolkit'
import {TodoAPI} from "./todoAPI";

export const todoOperationStatuses = {
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
  idle: 'idle',
}

const initialState = {
  items: [],
  status: todoOperationStatuses.idle,
  error: null
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    setTodoList: (state, action) => {
      // Ask: Why I cannot just assign to state?
      state.items = action.payload
    },
    resetStatus: (state, action) => {
      state.status = todoOperationStatuses.idle
      state.error = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(TodoAPI.create.pending, (state, action) => {
        state.status = todoOperationStatuses.loading
      })
      .addCase(TodoAPI.create.fulfilled, (state, action) => {
        state.status = todoOperationStatuses.succeeded
      })
      .addCase(TodoAPI.create.rejected, (state, action) => {
        state.status = todoOperationStatuses.failed
        state.error = action.error.message
      })

      .addCase(TodoAPI.fetchAll.pending, (state, action) => {
        state.status = todoOperationStatuses.loading
      })
      .addCase(TodoAPI.fetchAll.fulfilled, (state, action) => {
        state.status = todoOperationStatuses.succeeded
        state.items = action.payload
      })
      .addCase(TodoAPI.fetchAll.rejected, (state, action) => {
        state.status = todoOperationStatuses.failed
        state.error = action.error.message
      })

      .addCase(TodoAPI.fetchById.pending, (state, action) => {
        state.status = todoOperationStatuses.loading
      })
      .addCase(TodoAPI.fetchById.fulfilled, (state, action) => {
        state.status = todoOperationStatuses.succeeded
        state.items = [action.payload]
      })
      .addCase(TodoAPI.fetchById.rejected, (state, action) => {
        state.status = todoOperationStatuses.failed
        state.error = action.error.message
      })

      // Ask: I can change the todo in the Redux store, but what if in a meanwhile somebody updated another todo?
      // This way my todo list will be out of sync
      .addCase(TodoAPI.updateById.pending, (state, action) => {
        state.status = todoOperationStatuses.loading
      })
      .addCase(TodoAPI.updateById.fulfilled, (state, action) => {
        state.status = todoOperationStatuses.succeeded
      })
      .addCase(TodoAPI.updateById.rejected, (state, action) => {
        state.status = todoOperationStatuses.failed
        state.error = action.error.message
      })

      .addCase(TodoAPI.removeById.pending, (state, action) => {
        state.status = todoOperationStatuses.loading
      })
      .addCase(TodoAPI.removeById.fulfilled, (state, action) => {
        state.status = todoOperationStatuses.succeeded
        const removedTodoId = action.meta.arg
        state.items = state.items.filter((obj) => obj.id !== removedTodoId)
      })
      .addCase(TodoAPI.removeById.rejected, (state, action) => {
        state.status = todoOperationStatuses.failed
        state.error = action.error.message
      })
  }
})

// TODO: Correct naming here?
export const {setTodoList, resetStatus} = todosSlice.actions

export default todosSlice.reducer

export const selectTodoList = state => state.todos.items
// TODO: Optimize todo retrieval
export const selectTodo = state => state.todos.items[0]
export const selectTodoOperationStatus = state => state.todos.status
export const selectTodoOperationError = state => state.todos.error
