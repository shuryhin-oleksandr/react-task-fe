import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import List from "./pages/List";
import {Container} from "@mui/material";
import CreateTodo from "./pages/CreateTodo";
import TodoDetail from "./pages/TodoDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Container maxWidth="md" sx={{paddingY: 5}}>
          <Routes>
            <Route path="/" element={<List/>}/>
            <Route path="/create-todo" element={<CreateTodo/>}/>
            <Route path="/todos/:id" element={<TodoDetail/>}/>
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
