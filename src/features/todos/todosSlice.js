import {createSlice} from '@reduxjs/toolkit'
import {fetchTodoList} from "./todoAPI";

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
    removeTodo: (state, action) => {
      state = []
    },
    setTodoList: (state, action) => {
      state.length = 0
      state.push(...action.payload)
    }
  }
})

export const getTodoList = async (dispatch, getState) => {
  // TODO: make it with try/catch
  try {
    const todos = await fetchTodoList()
    dispatch(setTodoList(todos))
  } catch (err) {
    console.log(err)
  }
}

export const {getTodosList, getTodo, removeTodo, setTodoList} = todosSlice.actions

export default todosSlice.reducer
