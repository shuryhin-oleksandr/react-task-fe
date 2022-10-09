import {Button, Typography} from "@mui/material";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {useDispatch, useSelector} from "react-redux";
import {selectTodo} from "./todosSlice";
import {TodoAPI} from "./todoAPI";
import {TodoForm} from "./TodoCreatePage";

const TodoUpdatePage = () => {
  const navigate = useNavigate();

  const {todoId} = useParams();
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(TodoAPI.fetchById(todoId))
  }, []);
  const todo = useSelector(selectTodo)

  return (
    <>
      <Button variant="contained" size="small" sx={{marginBottom: 3}} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>Update Todo</Typography>
      <Paper elevation={3} sx={{maxWidth: 230, padding: 3}}>
        <TodoForm initial={todo} editMode={true}/>
      </Paper>
    </>
  )
}

export {TodoUpdatePage}