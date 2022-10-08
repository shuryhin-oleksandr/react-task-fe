import React, { useState } from 'react'
import {Button, TextField} from "@mui/material";

export const TodoCreateForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const onNameChanged = e => setName(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)

  return (
    <section>
      <form>
        <TextField id="todoName" label="Name" variant="outlined" size="small" margin="dense"
                   value={name} onChange={onNameChanged} />
        <br/>
        <TextField id="todoDescription" label="Description" variant="outlined" size="small" margin="dense"
                   value={description} onChange={onDescriptionChanged}/>
        <br/>
        <Button variant="contained" size="small" sx={{marginTop: 1}}>Save</Button>
      </form>
    </section>
  )
}
