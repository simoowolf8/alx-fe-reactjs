import { create } from 'zustand';  // Correct named import
import useMessageStore from './useMessageStore'; // Importing message store to handle messages

const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (task) => {
    if (!task.title) {
      useMessageStore.getState().setMessage('Task title cannot be empty', 'error');
      return;
    }
    set((state) => ({ tasks: [...state.tasks, task] }));
    useMessageStore.getState().setMessage('Task added successfully', 'success');
  },
  removeTask: (id) => {
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
    useMessageStore.getState().setMessage('Task removed successfully', 'success');
  },
  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  },
  fetchTasks: async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      set({ tasks: data.slice(0, 5) });
      useMessageStore.getState().setMessage('Tasks fetched successfully', 'success');
    } catch (error) {
      console.error('Error fetching tasks:', error);
      useMessageStore.getState().setMessage('Error fetching tasks', 'error');
    }
  },
}));

export default useTaskStore;