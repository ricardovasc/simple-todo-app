import MockAdapter from 'axios-mock-adapter';
import { api } from './api';
import { Todo } from '../types/todo';

let todos: Todo[] = [
  { id: 1, description: 'Executar comando para criar app React com TypeScript', completed: false },
  { id: 2, description: 'Criar repositório no GitHub', completed: false },
  { id: 3, description: 'Configurar repositório remoto no GIT local', completed: false },
  { id: 4, description: 'Realizar commit inicial', completed: false },
];
let nextId = 4;

// Instanciar o mock na instância do axios importada
const mock = new MockAdapter(api, { delayResponse: 500 }); // Adiciona um pequeno delay para simular a rede

mock.onGet('/').reply(() => {
  console.log('MOCK GET: Retornando todas as tarefas');
  return [200, todos];
});

mock.onPost('/').reply((config) => {
  const { description } = JSON.parse(config.data);
  const newTodo: Todo = {
    id: nextId++,
    description,
    completed: false,
  };
  todos.push(newTodo);
  console.log('MOCK POST: Adicionada nova tarefa', newTodo);
  return [201, newTodo];
});

// Usando uma expressão regular para capturar o ID da URL
mock.onPatch(/\/(\d+)/).reply((config) => {
  const id = Number(config.url?.match(/\/(\d+)/)?.[1]);
  const { completed } = JSON.parse(config.data);
  const todo = todos.find((t) => t.id === id);

  if (todo) {
    todo.completed = completed;
    console.log(`MOCK PATCH: Tarefa ${id} atualizada`, todo);
    return [200, todo];
  }
  return [404, { error: 'Tarefa não encontrada' }];
});

mock.onDelete(/\/(\d+)/).reply((config) => {
  const id = Number(config.url?.match(/\/(\d+)/)?.[1]);
  const index = todos.findIndex((t) => t.id === id);

  if (index > -1) {
    todos.splice(index, 1);
    console.log(`MOCK DELETE: Tarefa ${id} removida`);
    return [204]; // Sucesso, sem conteúdo
  }
  return [404, { error: 'Tarefa não encontrada' }];
});

// Exportando uma função vazia apenas para facilitar a importação
export const installMock = () => {};
