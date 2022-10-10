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
  count: null,
  current: {},
  // status: todoOperationStatuses.idle,
  // error: null,
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
  // to server before detail/update pages todo data display.

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

      // .addCase(TodoAPI.fetchList.pending, (state, action) => {
      //   state.status = todoOperationStatuses.loading
      // })
      .addCase(TodoAPI.fetchList.fulfilled, (state, action) => {
        state.status = todoOperationStatuses.succeeded
        state.items = action.payload.results
        state.count = action.payload.count
      })
      // .addCase(TodoAPI.fetchList.rejected, (state, action) => {
      //   state.status = todoOperationStatuses.failed
      //   state.error = action.error.message
      // })

      // .addCase(TodoAPI.fetchById.pending, (state, action) => {
      //   state.status = todoOperationStatuses.loading
      // })
      .addCase(TodoAPI.fetchById.fulfilled, (state, action) => {
        //   state.status = todoOperationStatuses.succeeded
        //   const serverTodoData = action.payload
        //   const clientTodoIndex = state.items.findIndex(todo => todo.id === serverTodoData.id)
        //   state.items.splice(serverTodoData, 1, clientTodoIndex)
        state.current = action.payload
      })
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
export const selectTodosCount = state => state.todos.count
export const selectTodo = state => state.todos.current
// export const selectTodoOperationStatus = state => state.todos.status
// export const selectTodoOperationError = state => state.todos.error
