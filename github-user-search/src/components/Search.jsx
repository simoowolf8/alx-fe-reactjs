import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [username, setUsername] = useState(''); // To store what the user types

  const handleSearch = (e) => {
    e.preventDefault(); // Stop the page from reloading when the form is submitted
    if (username.trim() !== '') {
      onSearch(username); // Send the username to the parent component
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update the username state as the user types
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
