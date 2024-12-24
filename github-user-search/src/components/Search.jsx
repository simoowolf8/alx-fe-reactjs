import React, { useState } from 'react';

const Search = () => {
  const [username, setUsername] = useState(''); // Tracks input value
  const [userData, setUserData] = useState(null); // Stores user data
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(''); // Tracks error messages

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Start loading
    setError(''); // Clear any previous error
    setUserData(null); // Clear previous results

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("Looks like we cant find the user"); // Set the expected error message
      }
      const data = await response.json();
      setUserData(data); // Save user data
    } catch (err) {
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex space-x-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      {loading && <p>Loading...</p>} {/* Display loading */}
      {error && <p className="text-red-500">{error}</p>} {/* Display error */}
      {userData && (
        <div className="flex flex-col items-center mt-4">
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="w-24 h-24 rounded-full"
          />
          <h2 className="text-xl font-bold">{userData.login}</h2>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
