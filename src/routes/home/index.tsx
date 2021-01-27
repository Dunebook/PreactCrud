import { FunctionalComponent, h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useTodos } from "../../components/context";

import EditedTodoItem from "../../components/EditItem";
import TodoItem from "../../components/CrudItem";

import * as style from "./style.scss";

interface Props {
  user: string;
}

export type TodoItem = {
  id: string;
  text: string;
  isEditing: boolean;
  isCompleted: boolean;
};

type Filters = "all" | "done" | "undone";

const Home: FunctionalComponent<Props> = () => {
  const {
    todos,
    setTodos,
    onDeleteTodo,
    onEditTodo,
    onSaveEditing,
    onDiscardEditing,
    onToggleCompleted
  } = useTodos();

  const [todoInSearch, setTodoInSearch] = useState<string>("");
  const [todosToShow, setTodosToShow] = useState<TodoItem[]>(todos);
  const [activeFilter, setActiveFilter] = useState<Filters>("all");

  useEffect(() => {
    switch (activeFilter) {
      case "all":
        setTodosToShow(todos);
        break;
      case "done":
        setTodosToShow(todos.filter(todo => Boolean(todo.isCompleted)));
        break;
      case "undone":
        setTodosToShow(todos.filter(todo => todo.isCompleted === false));
        break;
    }
  }, [activeFilter, todos]);

  const onInputNewTodo = ({
    currentTarget
  }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setTodoInSearch(currentTarget.value);
  };

  const onAddNewTodo = () => {
    setTodos(prev => [
      {
        id: String(Date.now()),
        text: todoInSearch,
        isEditing: false,
        isCompleted: false
      },
      ...prev
    ]);
    setTodoInSearch("");
    setActiveFilter("all");
  };

  const isActive = (filter: Filters) =>
    activeFilter === filter ? style.active : "";

  return (
    <div class={style.todo}>
      <div class={style.addInputWrapper}>
        <input
          placeholder="Add new todo ←"
          value={todoInSearch}
          onInput={onInputNewTodo}
          type="text"
        />
        <button onClick={onAddNewTodo} disabled={!todoInSearch}>
          Add todo
        </button>
      </div>

      <div class={style.filterWrapper}>
        <button class={isActive("all")} onClick={() => setActiveFilter("all")}>
          All
        </button>
        <button
          class={isActive("done")}
          onClick={() => setActiveFilter("done")}
        >
          Done
        </button>
        <button
          class={isActive("undone")}
          onClick={() => setActiveFilter("undone")}
        >
          Undone
        </button>
      </div>

      <ul class={style.todoList}>
        {todosToShow.map(({ id, text, isEditing, isCompleted }) => (
          <li
            class={`${style.todoListItem} ${
              isCompleted ? style.todoListItemCompleted : ""
            }`}
          >
            {isEditing ? (
              <EditedTodoItem
                id={id}
                text={text}
                onSaveEditing={onSaveEditing}
                onDiscardEditing={onDiscardEditing}
              />
            ) : (
              <TodoItem
                onToggleCompleted={onToggleCompleted}
                isCompleted={isCompleted}
                id={id}
                text={text}
                onDeleteTodo={onDeleteTodo}
                onEditTodo={onEditTodo}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
