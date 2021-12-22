import { useSelector } from "react-redux";
import TodoItem from "../TodoItem";
import { selectTodo } from "../todoSlice";

function TodoList() {
  const list = useSelector(selectTodo);
  return (
    <>
      <h2>TODO LIST</h2>
      {list.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
    </>
  );
}

export default TodoList;
