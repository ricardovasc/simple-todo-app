
import React, { useEffect, useState } from 'react';
import { getTodos } from '../services/api';
import { Todo } from '../types/todo';
import { Box } from '@mui/material';
import TotalTodos from '../components/stats/TotalTodos';
import TasksStatusChart from '../components/stats/TasksStatusChart';
import UncompletedTodos from '../components/stats/UncompletedTodos';

const StatsPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, width: '100%' }}>
        <TotalTodos todos={todos} />
        <TasksStatusChart todos={todos} />
      </Box>
      <UncompletedTodos todos={todos} />
    </Box>
  );
};

export default StatsPage;
