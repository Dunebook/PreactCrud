import { createContext, FunctionalComponent, h } from "preact";
import { StateUpdater, useContext, useMemo, useState } from "preact/hooks";

import { TodoItem } from "../routes/home";

type TodosContextType = {
  todos: TodoItem[];
  setTodos: StateUpdater<TodoItem[]>;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string) => void;
  onSaveEditing: (id: string, value: string) => void;
  onDiscardEditing: (id: string) => void;
  onToggleCompleted: (id: string) => void;
};

export const initialState: TodoItem[] = [
  {
    id: "1",
    text: "Some todo 1",
    isEditing: false,
    isCompleted: false
  },
  {
    id: "2",
    text: "Some todo 2",
    isEditing: false,
    isCompleted: true
  },
  {
    id: "3",
    text: "Some todo 3",
    isEditing: false,
    isCompleted: false
  }
];

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  onDeleteTodo: () => {},
  onEditTodo: () => {},
  onSaveEditing: () => {},
  onDiscardEditing: () => {},
  onToggleCompleted: () => {}
});

const TodosProvider: FunctionalComponent = ({ children }) => {
  const [todos, setTodos] = useState(initialState);

  const onDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const onEditTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, isEditing: !todo.isEditing }
          : { ...todo, isEditing: false }
      )
    );
  };

  const onSaveEditing = (id: string, value: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: value, isEditing: false } : todo
      )
    );
  };

  const onDiscardEditing = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const onToggleCompleted = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const todosAPI = useMemo(() => {
    return {
      todos,
      setTodos,
      onDeleteTodo,
      onEditTodo,
      onSaveEditing,
      onDiscardEditing,
      onToggleCompleted
    };
  }, [todos, setTodos]);

  return (
    <TodosContext.Provider value={todosAPI}>{children}</TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
export default TodosProvider;
