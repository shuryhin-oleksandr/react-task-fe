import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";

function createData(
  id: number,
  status: string,
  name: number,
) {
  return {id, status, name};
}

const rows = [
  createData(1, 'Done', 'Feed the cat'),
  createData(2, 'In progress', 'Wash the car'),
  createData(3, 'To do', 'Call Denis'),
  createData(4, 'In progress', 'Go to driving'),
  createData(5, 'Expired', 'Make an estimation'),
];

const List = () => (
  <>
    <Typography variant="h4" gutterBottom>
      ToDo List
    </Typography>
    <NavLink to="/create-todo" style={{textDecoration: "none"}}>
      <Button variant="contained" size="small" sx={{marginBottom: 3}}>Create</Button>
    </NavLink>
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Staus</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell>
                <Typography variant="body2" gutterBottom>{row.status}</Typography>
              </TableCell>
              <TableCell>
                <NavLink to={`/todos/${row.id}`} style={{textDecoration: "none"}}>
                  {row.name}
                </NavLink>
              </TableCell>
              <TableCell>
                <Button variant="contained" size="small">Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
)

export default List
