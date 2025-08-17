import React from 'react';
import { Todo } from '../types/todo';
import { ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  return (
    <ListItem
      sx={{
        bgcolor: 'background.paper',
        mb: 1,
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <ListItemText
        primary={todo.description}
        sx={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'text.secondary' : 'text.primary',
        }}
      />
      <Box>
        <IconButton
          edge="end"
          aria-label="complete"
          onClick={() => onUpdate(todo.id, !todo.completed)}
          color={todo.completed ? 'success' : 'default'}
        >
          {todo.completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default TodoItem;
