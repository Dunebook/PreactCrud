import { FunctionalComponent, h, Fragment } from "preact";

import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";

import * as style from "./style.scss";

type Props = {
  text: string;
  id: string;
  isCompleted: boolean;
  onEditTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onToggleCompleted: (id: string) => void;
};

const TodoItem: FunctionalComponent<Props> = ({
  text,
  id,
  isCompleted,
  onEditTodo,
  onDeleteTodo,
  onToggleCompleted
}) => {
  return (
    <Fragment>
      <div
        onClick={() => onToggleCompleted(id)}
        class={`${style.todoText} ${
          isCompleted ? style.todoTextCompleted : ""
        }`}
      >
        {text}
      </div>
      {!isCompleted && (
        <div class={style.todoActions}>
          <span onClick={() => onEditTodo(id)}>
            <EditIcon />
          </span>
          <span onClick={() => onDeleteTodo(id)}>
            <DeleteIcon />
          </span>
        </div>
      )}
    </Fragment>
  );
};

export default TodoItem;
