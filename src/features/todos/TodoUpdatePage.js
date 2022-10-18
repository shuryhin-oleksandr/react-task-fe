import {Button, Typography} from "@mui/material";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {TodoForm} from "./TodoForm";
import {useGetTodoQuery} from "../api/apiSlice";

// Ask: try to go to this page from detail view, and then update
const TodoUpdatePage = () => {
  const navigate = useNavigate();

  const {todoId} = useParams();
  // Ask: do we need to refetch here? The todo could be update between moments
  // when use loaded a list page and moved on a specific todo page
  const {data: todo, isFetching, isSuccess} = useGetTodoQuery(todoId)

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