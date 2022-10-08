import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "@mui/material";

import {TodoListPage} from "./features/todos/TodoListPage";
import {TodoCreatePage} from "./features/todos/TodoCreatePage";
import {TodoDetailPage} from "./features/todos/TodoDetailPage";
import {TodoUpdatePage} from "./features/todos/TodoUpdatePage";

function App() {
  return (
    // TODO: Add redirect from '/' to '/todos'
    // Ask: Is is ok to use BrowserRouter?
    <BrowserRouter basename="todos">
      <div className="App">
        <Container maxWidth="md" sx={{paddingY: 5}}>
          <Routes>
            <Route path="/" element={<TodoListPage />}/>
            <Route path="/create" element={<TodoCreatePage />}/>
            <Route path="/:todoId" element={<TodoDetailPage />}/>
            <Route path="/:todoId/edit" element={<TodoUpdatePage />}/>
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
