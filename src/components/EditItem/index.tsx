import { FunctionalComponent, h, JSX, Fragment } from "preact";
import { useState } from "preact/hooks";

import DiscardIcon from "../icons/DiscardIcon";
import SaveIcon from "../icons/SaveIcon";

import * as style from "./style.scss";

type Props = {
  text: string;
  id: string;
  onSaveEditing: (id: string, value: string) => void;
  onDiscardEditing: (id: string) => void;
};

const EditedTodoItem: FunctionalComponent<Props> = ({
  text,
  id,
  onSaveEditing,
  onDiscardEditing
}) => {
  const [inputValue, setInputValue] = useState(text);

  return (
    <Fragment>
      <input
        onInput={e => setInputValue(e.currentTarget.value)}
        class={style.todoItemInput}
        type="text"
        value={inputValue}
      />
      <div class={style.todoActions}>
        <span onClick={() => onSaveEditing(id, inputValue)}>
          <SaveIcon />
        </span>
        <span onClick={() => onDiscardEditing(id)}>
          <DiscardIcon />
        </span>
      </div>
    </Fragment>
  );
};

export default EditedTodoItem;
