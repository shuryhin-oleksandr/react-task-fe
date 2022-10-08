import {createSlice} from '@reduxjs/toolkit'
import {TodoAPI} from "./todoAPI";

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    getTodosList: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = []
    },
    getTodo: (state, action) => {
      state = []
    },
    setTodoList: (state, action) => {
      // TODO: Why I cannot just assign to state?
      state.length = 0
      state.push(...action.payload)
    }
  }
})

export const getTodoList = async (dispatch, getState) => {
  try {
    const todos = await TodoAPI.fetchTodoList()
    dispatch(setTodoList(todos))
  } catch (err) {
    console.log(err)
  }
}

export const removeTodo = todoId => async (dispatch, getState) => {
  try {
    await TodoAPI.removeTodo(todoId)
    dispatch(getTodoList)
  } catch (err) {
    console.log(err)
  }
}


// TODO: Correct naming here?
export const {getTodosList, getTodo, setTodoList} = todosSlice.actions

export default todosSlice.reducer
