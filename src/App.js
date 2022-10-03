import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import List from "./pages/List";
import {Container} from "@mui/material";
import CreateTodo from "./pages/CreateTodo";
import TodoDetail from "./pages/TodoDetail";

function App() {
  return (
    <BrowserRouter basename="todos">
      <div className="App">
        <Container maxWidth="md" sx={{paddingY: 5}}>
          <Routes>
            <Route path="/" element={<List/>}/>
            <Route path="/create" element={<CreateTodo/>}/>
            <Route path="/:id" element={<TodoDetail/>}/>
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
