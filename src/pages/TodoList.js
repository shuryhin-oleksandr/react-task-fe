import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {Button, TableHead, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {listTodosUrl} from "../constants";
import axios from "axios";

export function createData(
  id: number,
  status: string,
  name: number,
  description: string = null,
  createdAt: Date = null,
) {
  return {id, status, name, description, createdAt};
}

const rows = [
  createData(1, 'Done', 'Feed the cat'),
  createData(2, 'In progress', 'Wash the car'),
  createData(3, 'To do', 'Call Denis'),
  createData(4, 'In progress', 'Go to driving'),
  createData(5, 'Expired', 'Make an estimation'),
  createData(6, 'In progress', 'Buy a new monitor'),
  createData(7, 'Done', 'Enroll to actors course'),
];

// export default TodoList

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const {count, page, rowsPerPage, onPageChange} = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{flexShrink: 0, ml: 2.5}}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
      </IconButton>
    </Box>
  );
}

export default function TodoList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [todos, setTodos] = React.useState([]);

  // let todos = rows
  // // TODO: clarify why not just fetch and assign to a variable, why work via state
  // // TODO: Why todos are printed 2 times?
  // axios.get(listTodosUrl)
  //   .then(res => {
  //     todos = res.data;
  //     console.log(todos)
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   })

  React.useEffect(() => {
    axios.get(listTodosUrl)
      .then(res => {
        setTodos(res.data);
      })
      .catch(e => {
        console.log(e);
      })
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        ToDo List
      </Typography>
      <NavLink to="/create" style={{textDecoration: "none"}}>
        <Button variant="contained" size="small" sx={{marginBottom: 3}}>Create</Button>
      </NavLink>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 500}} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Staus</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
                ? todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : todos
            ).map((todo) => (
              <TableRow key={todo.name}>
                <TableCell component="th" scope="row">
                  <Typography variant="body2" gutterBottom>{todo.status}</Typography>
                </TableCell>
                <TableCell>
                  <NavLink to={`/${todo.id}`} style={{textDecoration: "none"}}>
                    {todo.name}
                  </NavLink>
                </TableCell>
                <TableCell>
                  <Button variant="contained" size="small">Remove</Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={6}/>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                colSpan={3}
                count={todos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
