import axios from "axios";
import {todoListUrl} from "../../constants";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const TodoAPI = {
  create: createAsyncThunk('todos/create', async (todoData) => {
    // setTimeout(async () => {
    const todoCreateUrl = `${todoListUrl}/`
    const response = await axios.post(todoCreateUrl, todoData)
    return response.data
    // }, 2000);
  }),
  fetchAll: createAsyncThunk('todos/fetchAll', async () => {
    const response = await axios.get(`${todoListUrl}/`)
    return response.data
  }),
  fetchById: createAsyncThunk('todos/fetchById', async (todoId) => {
    const todoDetailUrl = `${todoListUrl}/${todoId}/`
    const response = await axios.get(todoDetailUrl)
    return response.data
  }),
  updateById: createAsyncThunk('todos/updateById', async ({todoId, todoData}) => {
    const todoUpdatelUrl = `${todoListUrl}/${todoId}/`
    const response = await axios.patch(todoUpdatelUrl, todoData)
    return response.data
  }),
  removeById: createAsyncThunk('todos/removeById', async (todoId) => {
    const todoRemoveUrl = `${todoListUrl}/${todoId}/`
    const response = await axios.delete(todoRemoveUrl)
    return response.data
  }),
}
