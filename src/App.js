import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "@mui/material";

import TodoList from "./pages/TodoList";
import TodoCreate from "./pages/TodoCreate";
import TodoDetail from "./pages/TodoDetail";

function App() {
  return (
    <BrowserRouter basename="todos">
      <div className="App">
        <Container maxWidth="md" sx={{paddingY: 5}}>
          <Routes>
            <Route path="/" element={<TodoList/>}/>
            <Route path="/create" element={<TodoCreate/>}/>
            <Route path="/:id" element={<TodoDetail/>}/>
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
