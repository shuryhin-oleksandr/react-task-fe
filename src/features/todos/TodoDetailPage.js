import {Button, Chip, Typography} from "@mui/material";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Box from "@mui/material/Box";
import {selectTodoById} from "./todosSlice";
import {useDispatch, useSelector} from "react-redux";
import {TodoAPI} from "./todoAPI";


const TodoDetailPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button variant="contained" size="small" sx={{marginBottom: 3}} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>Todo details</Typography>
      <Paper elevation={3} sx={{maxWidth: 350, padding: 3}}>
        <TodoDetail/>
      </Paper>
    </>
  )
}

const TodoDetail = () => {
  const {todoId} = useParams();
  const todo = useSelector(state => selectTodoById(state, todoId))

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(TodoAPI.fetchById(todoId))
  }, []);

  // const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  // const dateStr = row.createdAt.toLocaleDateString("en-US", dateOptions)
  // let dateStr = row.createdAt.toDateString()

  // Ask: Is that a correct way for a conditional rendering?
  if (!todo) {
    return <Typography variant="h6">Todo not found</Typography>
  }

  return (
    <>
      <Box sx={{display: "flex"}}>
        <Typography variant="h6">
          {todo.name}
        </Typography>
        <Chip label={todo.done ? 'Done' : 'Undone'} color="primary" variant="outlined" size="small"
              sx={{marginLeft: 1, marginTop: -1}}/>
        <NavLink to="edit" style={{textDecoration: "none", marginLeft: "auto"}}>
          <Button variant="contained" size="small">Edit</Button>
        </NavLink>
      </Box>
      <Typography variant="body1" gutterBottom>
        {todo.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {/*Ask: How to debug an app ()*/}
        {/*Ask: fix date formatting*/}
        {todo.created_at}
      </Typography>
    </>
  )
}

export {TodoDetailPage}
