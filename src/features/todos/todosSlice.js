import {createSlice} from '@reduxjs/toolkit'
import {TodoAPI} from "./todoAPI";

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    setTodoList: (state, action) => {
      // Ask: Why I cannot just assign to state?
      state.length = 0
      state.push(...action.payload)
    }
  }
})

export const createTodo = todoData => async (dispatch, getState) => {
  try {
    await TodoAPI.create(todoData)
    dispatch(getTodoList)
  } catch (err) {
    console.log(err)
  }
}

// Ask: How to trace thunk actions?
export const getTodoList = async (dispatch, getState) => {
  try {
    const todos = await TodoAPI.fetchAll()
    dispatch(setTodoList(todos))
  } catch (err) {
    console.log(err)
  }
}

export const getTodo = todoId => async (dispatch, getState) => {
  try {
    const todo = await TodoAPI.fetchById(todoId)
    dispatch(setTodoList([todo]))
  } catch (err) {
    console.log(err)
  }
}

export const updateTodo = (todoId, todoData) => async (dispatch, getState) => {
  try {
    const todo = await TodoAPI.updateById(todoId, todoData)
    dispatch(setTodoList([todo]))
  } catch (err) {
    console.log(err)
  }
}

export const removeTodo = todoId => async (dispatch, getState) => {
  try {
    await TodoAPI.removeById(todoId)
    dispatch(getTodoList)
  } catch (err) {
    console.log(err)
  }
}

// TODO: Correct naming here?
export const {setTodoList} = todosSlice.actions

export default todosSlice.reducer

export const selectTodoList = state => state.todos
// TODO: Optimize todo retrieval
export const selectTodo = state => state.todos[0]
