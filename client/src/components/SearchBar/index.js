import React, { useState } from "react";
import axios from "axios";
import "./index.css";

import API_BASE_URL from "../../config";

axios
  .get(`${API_BASE_URL}/notes?search=${query}`)
  .then((response) => {
    setNotes(response.data);
  })
  .catch((error) => console.error("Error searching notes:", error));

const SearchBar = ({ setNotes }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/api/notes?search=${query}`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => console.error("Error searching notes:", error));
  };

  return (
    <form onSubmit={handleSearch} className="d-flex mb-3 search-bar-container">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search by title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-outline-secondary" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
