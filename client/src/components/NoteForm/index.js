import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Others");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/notes/${id}`)
        .then((response) => {
          const { title, description, category, completed } = response.data;
          setTitle(title);
          setDescription(description);
          setCategory(category);
          setCompleted(completed);
        })
        .catch((error) => console.error("Error fetching note:", error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteData = { title, description, category, completed };

    if (id) {
      axios
        .put(`http://localhost:5000/api/notes/${id}`, noteData)
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.error("Error updating note:", error));
    } else {
      axios
        .post("http://localhost:5000/api/notes", noteData)
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.error("Error creating note:", error));
    }
  };

  return (
    <div className="note-form-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <label className="form-check-label" htmlFor="completed">
            Completed
          </label>
        </div>
        <div className="d-flex mt-3 justify-content-between">
          <button type="submit" className="btn btn-primary me-2">
            {id ? "Update Note" : "Add Note"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
