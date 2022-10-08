import axios from "axios";
import {todoListUrl} from "../../constants";

export class TodoAPI {
  static async fetchAll() {
    const res = await axios.get(`${todoListUrl}/`)
    return res.data
  };

  static async removeById(todoId) {
    const todoRemoveUrl = `${todoListUrl}/${todoId}/`
    const res = await axios.delete(todoRemoveUrl)
    return res.data
  };

  static async fetchById(todoId) {
    const todoDetailUrl = `${todoListUrl}/${todoId}/`
    const res = await axios.get(todoDetailUrl)
    return res.data
  }
}
