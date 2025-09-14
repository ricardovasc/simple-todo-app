import React from 'react';
import TodoList from './components/TodoList';
import StatsPage from './pages/StatsPage';
import { Container, CssBaseline, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button component={Link} to="/" variant="contained">Todo List</Button>
            <Button component={Link} to="/stats" variant="contained">Stats</Button>
          </Box>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
