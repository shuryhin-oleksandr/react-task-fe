import './App.css';
import Button from '@mui/material/Button';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

function createData(
  status: string,
  name: number,
) {
  return {status, name};
}

const rows = [
  createData('Done', 'Feed the cat'),
  createData('In progress', 'Wash the car'),
  createData('To do', 'Call Denis'),
  createData('In progress', 'Go to driving'),
  createData('Expired', 'Make an estimation'),
];

function App() {
  return (
    <div className="App">
      <Container maxWidth="md" sx={{paddingY: 5}}>
        <Typography variant="h4" gutterBottom>
          ToDo List
        </Typography>
        <Button variant="contained" size="small" sx={{marginBottom: 3}}>Create</Button>
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
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" size="small">Remove</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default App;
