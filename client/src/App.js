import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <h1 className="my-4">Personal Notes Manager</h1>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/add" element={<NoteForm />} />
        <Route path="/edit/:id" element={<NoteForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
