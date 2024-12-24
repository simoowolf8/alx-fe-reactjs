import React, { useState } from 'react';

const Search = () => {
  const [username, setUsername] = useState(''); // Tracks input value
  const [userData, setUserData] = useState(null); // Stores user data
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(''); // Tracks error messages

  // Define fetchUserData
  const fetchUserData = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("Looks like we cant find the user");
    }
    return response.json();
  };

  // Handle search logic
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const data = await fetchUserData(username); // Call fetchUserData
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
