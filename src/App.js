import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import List from "./pages/List";
import {Container} from "@mui/material";
import CreateTodo from "./pages/CreateTodo";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Container maxWidth="md" sx={{paddingY: 5}}>
          <Routes>
            <Route path="/" element={<List/>}/>
            <Route path="/create-todo" element={<CreateTodo/>}/>
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
