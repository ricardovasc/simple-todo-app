import React, { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/api';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';
import { List, Box, Typography, Alert } from '@mui/material';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        setError('Falha ao carregar as tarefas. Verifique se a API está em execução.');
      }
    };
    fetchTodos();
  }, []);

  const handleAdd = async (description: string) => {
    try {
      const newTodo = await addTodo(description);
      setTodos([...todos, newTodo]);
      setError(null);
    } catch (err) {
      setError('Falha ao adicionar a tarefa.');
    }
  };

  const handleUpdate = async (id: number, completed: boolean) => {
    try {
      const updatedTodo = await updateTodo(id, completed);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      setError(null);
    } catch (err) {
      setError('Falha ao atualizar a tarefa.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Falha ao remover a tarefa.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Tarefas
      </Typography>
      <AddTodoForm onAdd={handleAdd} />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
