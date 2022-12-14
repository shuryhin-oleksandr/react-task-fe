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
import {Button, Checkbox, TableHead, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useDeleteTodoMutation, useEditTodoMutation, useGetTodosQuery} from "../api/apiSlice";


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

let TodoListPage = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        ToDo List
      </Typography>
      <NavLink to="/create" style={{textDecoration: "none"}}>
        <Button variant="contained" size="small" sx={{marginBottom: 3}}>Create</Button>
      </NavLink>
      <TodoList/>
    </>
  )
}

const ErrorPaper = (props) => (
  <Paper elevation={3} sx={{maxWidth: 350, padding: 3}}>
    <Typography variant="h6">{props.message}</Typography>
  </Paper>
)

// Ask: why do I see 2 actions in Redux Debug Toolbar?
const TodoList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let limit = rowsPerPage === -1 ? null : rowsPerPage;
  let offset = page * rowsPerPage;
  // RTK cahces results, but what if someone created a to-do in a meanwhile on the server?
  const {
    data: todosData = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery({limit, offset})

  const [editToDo, {isEditLoading}] = useEditTodoMutation()
  const [deleteToDo, {isDeleteLoading}] = useDeleteTodoMutation()

  const todos = todosData.results || []
  const todosCount = todosData.count

  console.log(todos)
  console.log(error)

  const updateTodoDone = async (todoId, done) => {
    await editToDo({todoId: todoId, todoData: {done}})
  }

  // Ask: why does it work with no async and await?
  const removeTodo = async (todoId) => {
    await deleteToDo(todoId)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, rowsPerPage - todos.length) : 0;
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

  if (error) {
    return <ErrorPaper message={`${error.status}: ${error.error}`} />
  }
  // Ask: deduplicate with TodoDetailPage
  if (!todosCount) {
    return <ErrorPaper message='Todos not found' />
  }

  return (
    <>
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
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell component="th" scope="row">
                  <Checkbox checked={todo.done} onClick={() => updateTodoDone(todo.id, !todo.done)}/>
                </TableCell>
                <TableCell>
                  <NavLink to={`/${todo.id}/`} style={{textDecoration: "none"}}>
                    {todo.name}
                  </NavLink>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => removeTodo(todo.id)}
                  >Remove</Button>
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
                rowsPerPageOptions={[3, 5, 10, {label: 'All', value: -1}]}
                colSpan={3}
                count={todosCount}
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
};

export {TodoListPage}
