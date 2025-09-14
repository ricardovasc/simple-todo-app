
import React from 'react';
import { Todo } from '../../types/todo';
import { Box, Typography } from '@mui/material';

interface TotalTodosProps {
  todos: Todo[];
}

const TotalTodos: React.FC<TotalTodosProps> = ({ todos }) => {
  return (
    <Box sx={{ p: 2, border: '1px solid grey', borderRadius: 2, width: '40%', textAlign: 'center' }}>
      <Typography variant="h6">Total de Tarefas</Typography>
      <Typography variant="h4">{todos.length}</Typography>
    </Box>
  );
};

export default TotalTodos;
