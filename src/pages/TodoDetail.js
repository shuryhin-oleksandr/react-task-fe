import {Button, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TodoDetail = () => {
  let navigate = useNavigate();

  return (
    <>
      <Button variant="contained" size="small" sx={{marginBottom: 3}} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>Todo details</Typography>
    </>
  )
}

export default TodoDetail
