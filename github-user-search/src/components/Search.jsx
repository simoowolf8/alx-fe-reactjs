import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [username, setUsername] = useState(''); // To track the input field value
  const [userData, setUserData] = useState(null); // To store API data
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(''); // To store error messages

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevents page reload
    setLoading(true); // Start loading
    setError(''); // Clear any previous error messages
    setUserData(null); // Clear previous data

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("Looks like we can't find the user"); // Handle errors
      }
      const data = await response.json();
      setUserData(data); // Save API response
    } catch (err) {
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Search Input */}
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
      {loading && <p>Loading...</p>} {/* Displays while loading */}
      {error && <p className="text-red-500">{error}</p>} {/* Displays if an error occurs */}
      {userData && (
        <div className="flex flex-col items-center mt-4">
          <img
            src={userData.avatar_url} // Avatar URL from API
            alt={userData.login} // GitHub username for alt text
            className="w-24 h-24 rounded-full"
          />
          <h2 className="text-xl font-bold">{userData.login}</h2> {/* GitHub username */}
          <a
            href={userData.html_url} // Profile link from API
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
