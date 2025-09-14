
import React from 'react';
import { Todo } from '../../types/todo';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface TasksStatusChartProps {
  todos: Todo[];
}

const TasksStatusChart: React.FC<TasksStatusChartProps> = ({ todos }) => {
  const completedTodos = todos.filter(todo => todo.completed).length;
  const uncompletedTodos = todos.length - completedTodos;

  const chartData = {
    labels: ['Completed', 'Uncompleted'],
    datasets: [
      {
        data: [completedTodos, uncompletedTodos],
        backgroundColor: ['#4BC0C0', '#FFCE56'],
        hoverBackgroundColor: ['#4BC0C0', '#FFCE56'],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value: number, ctx: any) => {
          const datapoints = ctx.chart.data.datasets[0].data;
          const total = datapoints.reduce((total: number, datapoint: number) => total + datapoint, 0);
          const percentage = (value / total) * 100;
          return percentage.toFixed(2) + '%';
        },
        color: '#fff',
      },
    },
  };

  return (
    <Box sx={{ p: 2, border: '1px solid grey', borderRadius: 2, width: '40%', textAlign: 'center' }}>
      <Typography variant="h6">Status das Tarefas</Typography>
      <Doughnut data={chartData} options={options} />
    </Box>
  );
};

export default TasksStatusChart;
