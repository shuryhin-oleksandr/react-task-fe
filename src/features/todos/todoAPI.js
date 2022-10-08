import axios from "axios";
import {todoListUrl} from "../../constants";

export class TodoAPI {
  static async fetchTodoList() {
    const res = await axios.get(`${todoListUrl}/`)
    return res.data
  };

  static async removeTodo(todoId) {
    const todoRemoveUrl = `${todoListUrl}/${todoId}/`
    const res = await axios.delete(todoRemoveUrl)
    return res.data
  };
}
