import { Fragment, h } from "preact";

import { useTodos } from "../../components/context";

import * as style from "./style.scss";

const ListPage = () => {
  const { todos, onDeleteTodo } = useTodos();
  console.log("todos", todos);

  return (
    <div class={style.listPage}>
      <h2>list page</h2>

      <p style={{ marginTop: "100px" }}>
        {todos.map(({ text, id }) => (
          <Fragment>
            <p class={style.listItem}>
              {text}
              <button onClick={() => onDeleteTodo(id)}>Delete this TODO</button>
            </p>
            <hr />
          </Fragment>
        ))}
      </p>
    </div>
  );
};

export default ListPage;
