// src/__tests__/TodoList.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../TodoList";

describe("TodoList Component", () => {
  test("renders TodoList and displays initial todos", () => {
    render(<TodoList />);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Master JavaScript")).toBeInTheDocument();
  });

  test("allows users to add a new todo", () => {
    render(<TodoList />);

    fireEvent.change(screen.getByPlaceholderText("Add a new todo"), {
      target: { value: "New Todo" },
    });
    fireEvent.click(screen.getByText("Add Todo"));

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("allows users to toggle a todo item", () => {
    render(<TodoList />);

    const todoItem = screen.getByText("Learn React");
    fireEvent.click(todoItem);

    expect(todoItem).toHaveStyle("text-decoration: line-through");

    fireEvent.click(todoItem);

    expect(todoItem).toHaveStyle("text-decoration: none");
  });

  test("allows users to delete a todo item", () => {
    render(<TodoList />);

    const deleteButton = screen.getAllByText("Delete")[0]; // Assumes first delete button
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});
