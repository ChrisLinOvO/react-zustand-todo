import { create, State, StateCreator, SetState } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id: string;
  todoContent: string;
  complete: boolean;
  edit: boolean;
}

interface TodoState extends State {
  todos: Array<Todo>;
  addNewTodo: (todoContent: string) => void;
  toggleCompleteTodo: (todoId: string) => void;
  deleteTodo: (todoId: string) => void;
  toggleEditTodo: (todoId: string) => void;
  updateEditingTodoContent: (todoId: string, todoContent: string) => void;
}

const todoObj = (todoContent: string): Todo => {
  return {
    id: uuidv4(),
    todoContent,
    complete: false,
    edit: false,
  };
};

const addNewTodo = (todos: Array<Todo>, todoContent: string): Array<Todo> => {
  const todo = todoObj(todoContent);
  const newTodo = todos.concat(todo);

  return newTodo;
};

const toggleCompleteTodo = (todos: Array<Todo>, todoId: string): Array<Todo> => {
  const newTodo = todos.map((todo) =>
    todo.id === todoId ? { ...todo, complete: !todo.complete } : todo
  );

  return newTodo;
};

const deleteTodo = (todos: Array<Todo>, todoId: string): Array<Todo> => {
  const newTodo = todos.filter((todo) => todo.id !== todoId);

  return newTodo;
};

const toggleEditTodo = (todos: Array<Todo>, todoId: string): Array<Todo> => {
  const newTodo = todos.map((todo) =>
    todo.id === todoId ? { ...todo, edit: !todo.edit } : todo
  );

  return newTodo;
};

const updateEditingTodoContent = (
  todos: Array<Todo>,
  todoId: string,
  todoContent: string
): Array<Todo> => {
  const newTodo = todos.map((todo) =>
    todo.id === todoId ? { ...todo, todoContent } : todo
  );

  return newTodo;
};

const useTodo: StateCreator<TodoState> = devtools((set: SetState<TodoState>) => ({
  todos: [],
  addNewTodo: (todoContent: string) => {
    set((state: TodoState) => ({ // 明確指定 state 參數的型別為 TodoState
      ...state,
      todos: addNewTodo(state.todos, todoContent),
    }));
  },
  toggleCompleteTodo: (todoId: string) => {
    set((state: TodoState) => ({
      ...state,
      todos: toggleCompleteTodo(state.todos, todoId),
    }));
  },
  deleteTodo: (todoId: string) => {
    set((state: TodoState) => ({
      ...state,
      todos: deleteTodo(state.todos, todoId),
    }));
  },
  toggleEditTodo: (todoId: string) => {
    set((state: TodoState) => ({
      ...state,
      todos: toggleEditTodo(state.todos, todoId),
    }));
  },
  updateEditingTodoContent: (todoId: string, todoContent: string) => {
    set((state: TodoState) => ({
      ...state,
      todos: updateEditingTodoContent(state.todos, todoId, todoContent),
    }));
  },
}));

export default create<TodoState>(useTodo);
