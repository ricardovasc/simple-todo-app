
// Importa as bibliotecas necessárias para o teste.
// O React é necessário para que o JSX seja compilado corretamente.
import React from 'react';
// A 'render' é usada para renderizar o componente em um ambiente de teste.
// A 'screen' é usada para consultar os elementos renderizados na tela.
// A 'fireEvent' é usada para disparar eventos, como cliques ou digitação.
import { render, screen, fireEvent } from '@testing-library/react';
// O 'jest-dom' nos dá acesso a 'matchers' extras para o Jest, como o 'toBeInTheDocument'.
import '@testing-library/jest-dom';
// Importa o componente que vamos testar.
import AddTodoForm from './AddTodoForm';

// A função 'describe' agrupa testes relacionados.
// É uma boa prática agrupar os testes de um componente em um 'describe'.
describe('AddTodoForm', () => {
  // A função 'test' ou 'it' define um caso de teste individual.
  // O primeiro argumento é uma descrição do que o teste deve fazer.
  test('deve renderizar o formulário de adicionar tarefa', () => {
    // A função 'jest.fn()' cria uma função "mock" (simulada).
    // Usamos isso para simular a função 'onAdd' que o componente espera receber.
    const mockOnAdd = jest.fn();

    // Renderiza o componente 'AddTodoForm' com a função mock.
    render(<AddTodoForm onAdd={mockOnAdd} />);

    // A 'screen.getByLabelText' busca um elemento pelo seu texto de "label".
    // Isso simula como um usuário encontraria o campo de texto.
    // Usamos uma expressão regular /nova tarefa/i para ignorar maiúsculas/minúsculas.
    expect(screen.getByLabelText(/nova tarefa/i)).toBeInTheDocument();

    // A 'screen.getByRole' busca um elemento pelo seu "role" de acessibilidade.
    // Botões têm o role 'button'. Também buscamos pelo nome (texto) do botão.
    expect(screen.getByRole('button', { name: /adicionar tarefa/i })).toBeInTheDocument();
  });

  test('deve permitir que o usuário digite no campo de texto', () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    // Busca o campo de texto pelo seu "label".
    const inputElement = screen.getByLabelText(/nova tarefa/i);

    // A 'fireEvent.change' simula o evento de mudança (digitação) no campo de texto.
    // O segundo argumento define o valor que o campo de texto deve ter.
    fireEvent.change(inputElement, { target: { value: 'Nova tarefa de teste' } });

    // A 'expect' verifica se o valor do campo de texto foi atualizado corretamente.
    expect(inputElement).toHaveValue('Nova tarefa de teste');
  });

  test('deve chamar a função onAdd com a descrição correta ao submeter o formulário', () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    const inputElement = screen.getByLabelText(/nova tarefa/i);
    const buttonElement = screen.getByRole('button', { name: /adicionar tarefa/i });

    // Simula a digitação no campo de texto.
    fireEvent.change(inputElement, { target: { value: 'Nova tarefa de teste' } });
    // Simula o clique no botão de adicionar.
    fireEvent.click(buttonElement);

    // Verifica se a função 'onAdd' foi chamada uma vez.
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    // Verifica se a função 'onAdd' foi chamada com o texto que digitamos.
    expect(mockOnAdd).toHaveBeenCalledWith('Nova tarefa de teste');
  });

  test('não deve chamar a função onAdd se a descrição estiver vazia', () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    const buttonElement = screen.getByRole('button', { name: /adicionar tarefa/i });

    // Simula o clique no botão sem digitar nada no campo de texto.
    fireEvent.click(buttonElement);

    // Verifica se a função 'onAdd' não foi chamada.
    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});
