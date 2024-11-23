import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../SearchBar";
import "./index.css";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notes")
      .then((response) => {
        setNotes(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:5000/api/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <div className="note-list-container">
      <Link to="/add" className="btn btn-primary add-note-btn">
        Add New Note
      </Link>
      <SearchBar setNotes={setNotes} />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border"></div>
          <p className="ms-2 mb-0">Loading notes...</p>
        </div>
      ) : (
        <div>
          {notes.length === 0 ? (
            <p>No notes found.</p>
          ) : (
            <ul className="list-group">
              {notes.map((note) => (
                <li key={note.id} className="list-group-item">
                  <div>
                    <strong>{note.title}</strong> <br />
                    <p>{note.description}</p>
                    <small>{note.category}</small>
                  </div>
                  <div>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        (window.location.href = `/edit/${note.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NoteList;
