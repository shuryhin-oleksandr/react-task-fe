import axios from "axios";
import {todoListUrl} from "../../constants";

export class TodoAPI {
  static async create(todoData) {
    const todoCreateUrl = `${todoListUrl}/`
    const res = await axios.post(todoCreateUrl, todoData)
    return res.data
  }

  static async fetchAll() {
    const res = await axios.get(`${todoListUrl}/`)
    return res.data
  };

  static async fetchById(todoId) {
    const todoDetailUrl = `${todoListUrl}/${todoId}/`
    const res = await axios.get(todoDetailUrl)
    return res.data
  }

  static async updateById(todoId, todoData) {
    const todoUpdatelUrl = `${todoListUrl}/${todoId}/`
    const res = await axios.patch(todoUpdatelUrl, todoData)
    return res.data
  }

  static async removeById(todoId) {
    const todoRemoveUrl = `${todoListUrl}/${todoId}/`
    const res = await axios.delete(todoRemoveUrl)
    return res.data
  };
}
