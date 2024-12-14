import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState(''); // Added steps field
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients || !steps) {
      setError('All fields are required.');
      return;
    }

    // Log the form data (can later send to a backend or update state)
    console.log({
      title,
      ingredients: ingredients.split(',').map((item) => item.trim()),
      steps: steps.split('\n').map((step) => step.trim()),
    });

    // Reset form
    setError('');
    setTitle('');
    setIngredients('');
    setSteps('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Recipe</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto"
      >
        {/* Recipe Title Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Recipe Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Ingredients Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">
            Ingredients (comma-separated)
          </label>
          <textarea
            id="ingredients"
            placeholder="e.g., Chicken, Tomatoes, Cream"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        {/* Steps Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="steps">
            Steps (one step per line)
          </label>
          <textarea
            id="steps"
            placeholder="e.g., Step 1: Preheat the oven\nStep 2: Mix ingredients"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="shadow appearance-none bor
