import React, { useState } from 'react';
import Search from './components/Search';

const App = () => {
  const [userData, setUserData] = useState(null); // To store the GitHub user data
  const [loading, setLoading] = useState(false); // To track if we are waiting for the API
  const [error, setError] = useState(''); // To store any error message

  const fetchUserData = async (username) => {
    setLoading(true); // Show loading
    setError(''); // Clear previous errors
    setUserData(null); // Clear previous results

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found'); // If the username doesn't exist
      }
      const data = await response.json(); // Parse the response
      setUserData(data); // Save the user data
    } catch (err) {
      setError(err.message); // Save the error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h1>GitHub User Search</h1>
      <Search onSearch={fetchUserData} />
      {loading && <p>Loading...</p>} {/* Show loading message */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={userData.login} style={{ width: '100px', borderRadius: '50%' }} />
          <h2>{userData.name || 'No Name Available'}</h2>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">View GitHub Profile</a>
        </div>
      )}
    </div>
  );
};

export default App;