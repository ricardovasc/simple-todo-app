
import React, { useEffect, useState } from 'react';
import { getTodos } from '../services/api';
import { Todo } from '../types/todo';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const completedTodos = todos.filter(todo => todo.completed).length;
  const uncompletedTodos = todos.length - completedTodos;

  const chartData = {
    labels: ['Completa', 'Incompleta'],
    datasets: [
      {
        data: [completedTodos, uncompletedTodos],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, width: '100%' }}>
        <Box sx={{ p: 2, border: '1px solid grey', borderRadius: 2, width: '40%', textAlign: 'center' }}>
          <Typography variant="h6">Total de Tarefas</Typography>
          <Typography variant="h4">{todos.length}</Typography>
        </Box>
        <Box sx={{ p: 2, border: '1px solid grey', borderRadius: 2, width: '40%', textAlign: 'center' }}>
          <Typography variant="h6">Status das Tarefas</Typography>
          <Doughnut data={chartData} />
        </Box>
      </Box>
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
    </Box>
  );
};

export default StatsPage;
