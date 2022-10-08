import {Button, TextField, Typography} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {useDispatch, useSelector} from "react-redux";
import {getTodo, selectTodo, updateTodo} from "./todosSlice";

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
  const dispatch = useDispatch()
  const {todoId} = useParams();
  React.useEffect(() => {
    dispatch(getTodo(todoId))
  }, []);

  const todo = useSelector(selectTodo)
  const [name, setName] = useState(todo.name)
  const [description, setDescription] = useState(todo.description)

  const onNameChanged = e => setName(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)

  const handleSubmit = () => {
    dispatch(updateTodo(todoId, {name, description}))
  }

  // Ask: how to deduplicate with todoCreateForm
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