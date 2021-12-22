import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITodoItem } from "../interface";
import { removeTodoThunk } from "../thunk";
import TodoHistory from "../TodoHistory";
import { editTodo, selectHistoryTodos } from "../todoSlice";

interface ITodoItemProps {
  todo: ITodoItem;
}
const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const listHistoryUpdateTodo = useSelector(selectHistoryTodos);

  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <>
      <div>
        Title: <b>{todo.title}</b>
      </div>
      <div>
        {!isShow && todo.isUpdate && (
          <span
            style={{ color: "red", fontSize: 12, cursor: "pointer" }}
            onClick={() => setIsShow(true)}
          >
            Đã chỉnh sửa
          </span>
        )}
        {isShow &&
          listHistoryUpdateTodo.map((historyTodo, index) => {
            if (todo.id === historyTodo.id) {
              return <TodoHistory key={index} historyTodo={historyTodo} />;
            }
            return () => {};
          })}
      </div>
      <button onClick={() => dispatch(editTodo(todo))}>Sửa</button>
      <button onClick={() => dispatch(removeTodoThunk(todo.id))}>Xóa</button>
    </>
  );
};

export default TodoItem;
