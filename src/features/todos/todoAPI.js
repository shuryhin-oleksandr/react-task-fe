import axios from "axios";
import {todoListUrl} from "../../constants";

export const fetchTodoList = async () => {
  const res = await axios.get(`${todoListUrl}/`)
  return res.data
}
