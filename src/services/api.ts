import axios from 'axios';
import { Todo } from '../types/todo';

const API_URL = 'http://localhost:8080/todos';

export const api = axios.create({
  baseURL: API_URL,
});

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get('/');
  return response.data;
};

export const addTodo = async (description: string): Promise<Todo> => {
  const response = await api.post('/', { description, completed: false });
  return response.data;
};

export const updateTodo = async (id: number, completed: boolean): Promise<Todo> => {
  const response = await api.patch(`/${id}`, { completed });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/${id}`);
};
