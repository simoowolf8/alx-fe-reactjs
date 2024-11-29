import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTodoForm from "../components/TodoList"; // AddTodoForm is in TodoList.jsx

describe("AddTodoForm Component", () => {
  test("renders input field and add button", () => {
    render(<AddTodoForm onAddTodo={jest.fn()} />);

    expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  test("calls onAddTodo when form is submitted", () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.click(addButton);

    expect(mockOnAddTodo).toHaveBeenCalledWith("New Todo Item");
    expect(input.value).toBe(""); // Ensure input is cleared after submission
  });

  test("does not call onAddTodo when input is empty", () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });
});
