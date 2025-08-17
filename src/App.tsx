import React from 'react';
import TodoList from './components/TodoList';
import { Container, CssBaseline, Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <TodoList />
        </Box>
      </Container>
    </>
  );
};

export default App;
