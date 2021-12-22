import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTodoThunk, updateTodoThunk } from "../thunk";
import { cancelUpdateTodo, selectCurrentTodo, selectIsAdd } from "../todoSlice";

function Modal() {
  const isAdd = useSelector(selectIsAdd);
  const currentTodo = useSelector(selectCurrentTodo);
  const dispatch = useDispatch();
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    setTitleInput(currentTodo.title);
    titleInputRef.current?.focus();
  }, [currentTodo]);

  const handleSubmit = () => {
    if (isAdd) {
      if (titleInput !== "") {
        dispatch(
          addTodoThunk({
            id: uuidv4(),
            title: titleInput,
            isUpdate: false,
          })
        );
        setTitleInput("");
        titleInputRef.current?.focus();
      } else {
        titleInputRef.current?.focus();
      }
    } else {
      if (currentTodo.title === titleInput) {
        dispatch(cancelUpdateTodo(currentTodo));
        setTitleInput("");
        titleInputRef.current?.focus();
      } else {
        dispatch(
          updateTodoThunk({
            id: currentTodo.id,
            title: titleInput,
            isUpdate: true,
          })
        );
        setTitleInput("");
        titleInputRef.current?.focus();
      }
    }
  };
  return (
    <>
      <h3>Add Todo</h3>
      <input
        ref={titleInputRef}
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
      />
      <div>
        <button onClick={handleSubmit}>{isAdd ? "ADD" : "SAVE"}</button>
      </div>
    </>
  );
}

export default Modal;
