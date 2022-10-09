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
    // resetStatus: (state, action) => {
    //   state.status = todoOperationStatuses.idle
    //   state.error = null
    // }
  },
  // Ask: From what I understand, create, update and remove should not update a whole list of todos from server.
  // It will be strange, the user removes and item, but actually he see new items in a list added by another
  // users to the server in a meanwhile
  extraReducers(builder) {
    builder
      // .addCase(TodoAPI.create.pending, (state, action) => {
      //   state.status = todoOperationStatuses.loading
      // })
      // .addCase(TodoAPI.create.fulfilled, (state, action) => {
      //   state.status = todoOperationStatuses.succeeded
      // })
      // .addCase(TodoAPI.create.rejected, (state, action) => {
      //   state.status = todoOperationStatuses.failed
      //   state.error = action.error.message
      // })

      // .addCase(TodoAPI.fetchAll.pending, (state, action) => {
      //   state.status = todoOperationStatuses.loading
      // })
      .addCase(TodoAPI.fetchAll.fulfilled, (state, action) => {
        state.status = todoOperationStatuses.succeeded
        state.items = action.payload
      })
      // .addCase(TodoAPI.fetchAll.rejected, (state, action) => {
      //   state.status = todoOperationStatuses.failed
      //   state.error = action.error.message
      // })

      // .addCase(TodoAPI.fetchById.pending, (state, action) => {
      //   state.status = todoOperationStatuses.loading
      // })
      // .addCase(TodoAPI.fetchById.fulfilled, (state, action) => {
      //   state.status = todoOperationStatuses.succeeded
      //   const serverTodoData = action.payload
      //   const clientTodoIndex = state.items.findIndex(todo => todo.id === serverTodoData.id)
      //   state.items.splice(serverTodoData, 1, clientTodoIndex)
      // })
      // .addCase(TodoAPI.fetchById.rejected, (state, action) => {
      //   state.status = todoOperationStatuses.failed
      //   state.error = action.error.message
      // })

      // Ask: I can change the todo in the Redux store, but what if in a meanwhile somebody updated another todo?
      // This way my todo list will be out of sync
      // .addCase(TodoAPI.updateById.pending, (state, action) => {
      //   state.status = todoOperationStatuses.loading
      // })
      .addCase(TodoAPI.updateById.fulfilled, (state, action) => {
        state.status = todoOperationStatuses.succeeded
        const updatedTodoData = action.payload
        const oldTodoIndex = state.items.findIndex(todo => todo.id === updatedTodoData.id)
        state.items.splice(oldTodoIndex, 1, updatedTodoData)
      })
      // .addCase(TodoAPI.updateById.rejected, (state, action) => {
      //   state.status = todoOperationStatuses.failed
      //   state.error = action.error.message
      // })

      // .addCase(TodoAPI.removeById.pending, (state, action) => {
      //   state.status = todoOperationStatuses.loading
      // })
      .addCase(TodoAPI.removeById.fulfilled, (state, action) => {
        state.status = todoOperationStatuses.succeeded
        // TODO: add the same redux state handling for create and update
        const todoId = action.meta.arg
        state.items = state.items.filter((obj) => obj.id !== todoId)
      })
    // .addCase(TodoAPI.removeById.rejected, (state, action) => {
    //   state.status = todoOperationStatuses.failed
    //   state.error = action.error.message
    // })
  }
})

// TODO: Correct naming here?
export const {setTodoList, resetStatus} = todosSlice.actions

export default todosSlice.reducer

export const selectTodoList = state => state.todos.items
export const selectTodo = (state, todoId) => state.todos.items.find(todo => todo.id === todoId)
// export const selectTodoOperationStatus = state => state.todos.status
// export const selectTodoOperationError = state => state.todos.error
