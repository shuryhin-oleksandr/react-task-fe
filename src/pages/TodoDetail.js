import {Button, Chip, Typography} from "@mui/material";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Box from "@mui/material/Box";
import {getTodo, selectTodo} from "../features/todos/todosSlice";
import {useDispatch, useSelector} from "react-redux";


const TodoDetail = () => {
  const todo = useSelector(selectTodo)
  const {todoId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  // const dateStr = row.createdAt.toLocaleDateString("en-US", dateOptions)
  // let dateStr = row.createdAt.toDateString()

  React.useEffect(() => {
    dispatch(getTodo(todoId))
  }, []);

  return (
    <>
      <Button variant="contained" size="small" sx={{marginBottom: 3}} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>Todo details</Typography>
      <Paper elevation={3} sx={{maxWidth: 350, padding: 3}}>
        <Box sx={{display: "flex"}}>
          <Typography variant="h6">
            {todo.name}
          </Typography>
          <Chip label={todo.status ? 'Done' : 'Undone'} color="primary" variant="outlined" size="small"
                sx={{marginLeft: 1, marginTop: -1}}/>
          <NavLink to="edit" style={{textDecoration: "none", marginLeft: "auto"}}>
            <Button variant="contained" size="small">Edit</Button>
          </NavLink>
        </Box>
        <Typography variant="body1" gutterBottom>
          {todo.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {/*TODO: How to debug an app ()*/}
          {/*TODO: fix date formatting*/}
          {todo.created_at}
        </Typography>
      </Paper>
    </>
  )
}

export default TodoDetail
