
import React from 'react';
// A 'waitFor' é usada para esperar que algo aconteça, como uma chamada de API terminar.
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';
// Importamos as funções da API para que possamos "mocká-las".
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/api';
import { Todo } from '../types/todo';

// O 'jest.mock' intercepta as importações do módulo especificado e nos permite
// fornecer implementações falsas (mocks) para suas funções.
// Isso é crucial para isolar o componente de serviços externos, como uma API real.
jest.mock('../services/api');

// Para garantir que nossos mocks de API sejam do tipo correto, fazemos um "type casting".
const mockedGetTodos = getTodos as jest.Mock<Promise<Todo[]>>;
const mockedAddTodo = addTodo as jest.Mock<Promise<Todo>>;
const mockedUpdateTodo = updateTodo as jest.Mock<Promise<Todo>>;
const mockedDeleteTodo = deleteTodo as jest.Mock<Promise<void>>;

describe('TodoList', () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste para garantir a independência dos testes.
    jest.clearAllMocks();
  });

  test('deve buscar e exibir a lista de tarefas na renderização inicial', async () => {
    const mockTodos: Todo[] = [
      { id: 1, description: 'Primeira Tarefa', completed: false },
      { id: 2, description: 'Segunda Tarefa', completed: true },
    ];
    // Configuramos o mock de 'getTodos' para retornar nossa lista de tarefas de exemplo.
    mockedGetTodos.mockResolvedValue(mockTodos);

    render(<TodoList />);

    // A 'waitFor' espera até que a função dentro dela não gere mais erros (ou atinja o tempo limite).
    // Usamos isso para esperar que as tarefas apareçam na tela após a chamada da API.
    await waitFor(() => {
      // 'screen.findByText' é uma função assíncrona que espera um elemento aparecer.
      // É uma alternativa ao uso de 'waitFor' com 'getByText'.
      expect(screen.getByText('Primeira Tarefa')).toBeInTheDocument();
      expect(screen.getByText('Segunda Tarefa')).toBeInTheDocument();
    });
  });

  test('deve adicionar uma nova tarefa à lista', async () => {
    const newTodo: Todo = { id: 3, description: 'Nova Tarefa Adicionada', completed: false };
    // Começamos com uma lista vazia.
    mockedGetTodos.mockResolvedValue([]);
    // O mock de 'addTodo' retornará a nova tarefa quando for chamado.
    mockedAddTodo.mockResolvedValue(newTodo);

    render(<TodoList />);

    // Simula o usuário digitando e enviando o formulário.
    fireEvent.change(screen.getByLabelText(/nova tarefa/i), { target: { value: 'Nova Tarefa Adicionada' } });
    fireEvent.click(screen.getByRole('button', { name: /adicionar tarefa/i }));

    // Esperamos que a nova tarefa apareça na tela.
    await waitFor(() => {
      expect(screen.getByText('Nova Tarefa Adicionada')).toBeInTheDocument();
    });

    // Verificamos se a função da API 'addTodo' foi realmente chamada com o texto correto.
    expect(mockedAddTodo).toHaveBeenCalledWith('Nova Tarefa Adicionada');
  });

  test('deve atualizar uma tarefa para completada', async () => {
    const initialTodo: Todo = { id: 1, description: 'Tarefa para completar', completed: false };
    const updatedTodo: Todo = { ...initialTodo, completed: true };

    mockedGetTodos.mockResolvedValue([initialTodo]);
    mockedUpdateTodo.mockResolvedValue(updatedTodo);

    render(<TodoList />);

    // Espera a tarefa inicial ser renderizada.
    const todoText = await screen.findByText('Tarefa para completar');
    // Busca o botão de completar associado a essa tarefa.
    const completeButton = screen.getByLabelText('complete');

    fireEvent.click(completeButton);

    // Esperamos que a atualização (o estilo de linha através) seja aplicada.
    await waitFor(() => {
      expect(screen.getByTestId('CheckCircleIcon')).toBeInTheDocument();
    });

    // Verificamos se a API de atualização foi chamada corretamente.
    expect(mockedUpdateTodo).toHaveBeenCalledWith(1, true);
  });

  test('deve deletar uma tarefa da lista', async () => {
    const todoToDelete: Todo = { id: 1, description: 'Tarefa para deletar', completed: false };
    mockedGetTodos.mockResolvedValue([todoToDelete]);
    // Para o delete, não precisamos retornar nada, apenas garantir que a promessa seja resolvida.
    mockedDeleteTodo.mockResolvedValue();

    render(<TodoList />);

    const todoText = await screen.findByText('Tarefa para deletar');
    const deleteButton = screen.getByLabelText('delete');

    fireEvent.click(deleteButton);

    // Usamos 'waitFor' com 'queryByText'. 'queryByText' retorna null se não encontrar o elemento,
    // ao contrário de 'getByText' que gera um erro. Isso é perfeito para verificar se um elemento desapareceu.
    await waitFor(() => {
      expect(screen.queryByText('Tarefa para deletar')).not.toBeInTheDocument();
    });

    expect(mockedDeleteTodo).toHaveBeenCalledWith(1);
  });

  test('deve exibir uma mensagem de erro se a busca de tarefas falhar', async () => {
    // Configuramos o mock para rejeitar a promessa, simulando um erro de API.
    mockedGetTodos.mockRejectedValue(new Error('Falha na API'));

    render(<TodoList />);

    // Esperamos que a mensagem de erro, definida no componente, seja exibida.
    await waitFor(() => {
      expect(screen.getByText('Falha ao carregar as tarefas. Verifique se a API está em execução.')).toBeInTheDocument();
    });
  });
});
