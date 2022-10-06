import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "@mui/material";

import TodoList from "./pages/TodoList";
import TodoCreate from "./pages/TodoCreate";
import TodoDetail from "./pages/TodoDetail";
import TodoEdit from "./pages/TodoEdit";

function App() {
  return (
    // TODO: Add redirect from '/' to '/todos'
    // TODO: Is is ok to use BrowserRouter?
    <BrowserRouter basename="todos">
      <div className="App">
        <Container maxWidth="md" sx={{paddingY: 5}}>
          <Routes>
            <Route path="/" element={<TodoList/>}/>
            <Route path="/create" element={<TodoCreate/>}/>
            <Route path="/:todoId" element={<TodoDetail/>}/>
            <Route path="/:todoId/edit" element={<TodoEdit/>}/>
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
