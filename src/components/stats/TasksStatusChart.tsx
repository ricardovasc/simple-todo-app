
import React from 'react';
import { Todo } from '../../types/todo';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TasksStatusChartProps {
  todos: Todo[];
}

const TasksStatusChart: React.FC<TasksStatusChartProps> = ({ todos }) => {
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
    <Box sx={{ p: 2, border: '1px solid grey', borderRadius: 2, width: '40%', textAlign: 'center' }}>
      <Typography variant="h6">Status das Tarefas</Typography>
      <Doughnut data={chartData} />
    </Box>
  );
};

export default TasksStatusChart;
