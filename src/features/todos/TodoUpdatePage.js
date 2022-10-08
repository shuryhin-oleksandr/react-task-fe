import {Button, TextField, Typography} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {useDispatch} from "react-redux";
import {createTodo} from "./todosSlice";

const TodoUpdatePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="contained" size="small" sx={{marginBottom: 3}} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>Update Todo</Typography>
      <Paper elevation={3} sx={{maxWidth: 230, padding: 3}}>
        <TodoUpdateForm/>
      </Paper>
    </>
  )
}

export const TodoUpdateForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  const onNameChanged = e => setName(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)

  const handleSubmit = () => {
    dispatch(createTodo({name, description}))
  }

  return (
    <section>
      {/*Ask: Should I bind handleSubmit to form itself or to a sumit button*/}
      <form>
        <TextField id="todoName" label="Name" variant="outlined" size="small" margin="dense"
                   value={name} onChange={onNameChanged}/>
        <br/>
        <TextField id="todoDescription" label="Description" variant="outlined" size="small" margin="dense"
                   value={description} onChange={onDescriptionChanged}/>
        <br/>
        <Button variant="contained" size="small" sx={{marginTop: 1}} onClick={handleSubmit}>Save</Button>
      </form>
    </section>
  )
}

export {TodoUpdatePage}