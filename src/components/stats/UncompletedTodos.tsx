
import React from 'react';
import { Todo } from '../../types/todo';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

interface UncompletedTodosProps {
  todos: Todo[];
}

const UncompletedTodos: React.FC<UncompletedTodosProps> = ({ todos }) => {
  return (
    <Box sx={{ mt: 4, p: 2, border: '1px solid grey', borderRadius: 2, width: '82%' }}>
      <Typography variant="h6">Tarefas Incompletas</Typography>
      <List>
        {todos.filter(todo => !todo.completed).map(todo => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UncompletedTodos;
