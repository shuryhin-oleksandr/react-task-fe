import {Button, Chip, Typography} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {createData} from "./TodoList";
import * as React from "react";
import Box from "@mui/material/Box";

const row = createData(
  1, 'Done', 'Feed the cat', '1/2 baggier for dinner', Date(2022, 10, 4, 22, 34, 17))

const TodoDetail = () => {
  let navigate = useNavigate();
  // const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  // const dateStr = row.createdAt.toLocaleDateString("en-US", dateOptions)
  // let dateStr = row.createdAt.toDateString()
  let dateStr = "04 October 2022"

  return (
    <>
      <Button variant="contained" size="small" sx={{marginBottom: 3}} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>Todo details</Typography>
      <Paper elevation={3} sx={{maxWidth: 350, padding: 3}}>
        <Box sx={{display: "flex"}}>
          <Typography variant="h6">
            {row.name}
          </Typography>
          <Chip label={row.status} color="primary" variant="outlined" size="small" sx={{marginLeft: 1, marginTop: -1}}/>
          <NavLink to="edit" style={{textDecoration: "none", marginLeft: "auto"}}>
            <Button variant="contained" size="small">Edit</Button>
          </NavLink>
        </Box>
        <Typography variant="body1" gutterBottom>
          {row.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {/*TODO: How to debug an app*/}
          {/*TODO: fix date formatting*/}
          {dateStr}
        </Typography>
      </Paper>
    </>
  )
}

export default TodoDetail
