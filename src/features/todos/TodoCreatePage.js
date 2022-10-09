import {Button, Typography} from "@mui/material";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {TodoForm} from "./TodoForm";

const TodoCreatePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="contained" size="small" sx={{marginBottom: 3}} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>Create Todo</Typography>
      <Paper elevation={3} sx={{maxWidth: 230, padding: 3}}>
        <TodoForm initial={{name: '', description: ''}}/>
      </Paper>
    </>
  )
}

export {TodoCreatePage}
