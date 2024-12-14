import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // Import HomePage component
import RecipeDetail from './components/RecipeDetail'; // Import RecipeDetail component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />

        {/* Recipe Detail Route */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
