
// Novamente, importamos as bibliotecas de teste e o componente.
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo'; // Importamos o tipo Todo para criar nosso objeto de teste.

// Agrupamos os testes para o componente TodoItem.
describe('TodoItem', () => {
  // Criamos um objeto 'todo' de exemplo que será usado em nossos testes.
  // Isso garante que os testes sejam consistentes e previsíveis.
  const mockTodo: Todo = {
    id: 1,
    description: 'Tarefa de Teste',
    completed: false,
  };

  // Criamos funções mock para as props onUpdate e onDelete.
  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  // A função 'beforeEach' é executada antes de cada teste neste 'describe'.
  // Usamos isso para limpar os mocks e garantir que os testes sejam independentes.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar a descrição da tarefa', () => {
    // Renderizamos o componente com o todo de exemplo e as funções mock.
    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    // A 'screen.getByText' busca um elemento pelo texto que ele contém.
    // Verificamos se a descrição da nossa tarefa de exemplo está na tela.
    expect(screen.getByText('Tarefa de Teste')).toBeInTheDocument();
  });

  test('deve chamar onUpdate quando o botão de completar é clicado', () => {
    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    // Buscamos o botão pelo seu "aria-label", que é uma boa prática para acessibilidade.
    const completeButton = screen.getByLabelText('complete');
    // Simulamos um clique no botão.
    fireEvent.click(completeButton);

    // Verificamos se a função onUpdate foi chamada uma vez.
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    // Verificamos se onUpdate foi chamada com os argumentos corretos: o id do todo e o novo estado de 'completed'.
    expect(mockOnUpdate).toHaveBeenCalledWith(1, true);
  });

  test('deve chamar onDelete quando o botão de deletar é clicado', () => {
    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByLabelText('delete');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test('deve mostrar o ícone de círculo de verificação quando a tarefa está concluída', () => {
    const completedTodo: Todo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    expect(screen.getByTestId('CheckCircleIcon')).toBeInTheDocument();
  });

  test('deve mostrar o ícone de botão de rádio não marcado quando a tarefa não está concluída', () => {
    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    expect(screen.getByTestId('RadioButtonUncheckedIcon')).toBeInTheDocument();
  });
});
