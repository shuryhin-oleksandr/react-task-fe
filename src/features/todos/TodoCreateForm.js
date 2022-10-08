import React, { useState } from 'react'
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {createTodo} from "./todosSlice";

export const TodoCreateForm = () => {
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
      {/*TODO: Should I bind handleSubmit to form itself or to a sumit button*/}
      <form>
        <TextField id="todoName" label="Name" variant="outlined" size="small" margin="dense"
                   value={name} onChange={onNameChanged} />
        <br/>
        <TextField id="todoDescription" label="Description" variant="outlined" size="small" margin="dense"
                   value={description} onChange={onDescriptionChanged}/>
        <br/>
        <Button variant="contained" size="small" sx={{marginTop: 1}} onClick={handleSubmit}>Save</Button>
      </form>
    </section>
  )
}
