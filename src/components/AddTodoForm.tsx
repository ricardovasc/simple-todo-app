import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface AddTodoFormProps {
  onAdd: (description: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (description.trim()) {
      onAdd(description);
      setDescription('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <TextField
        label="Nova Tarefa"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ whiteSpace: 'nowrap' }}>
        Adicionar Tarefa
      </Button>
    </Box>
  );
};

export default AddTodoForm;
