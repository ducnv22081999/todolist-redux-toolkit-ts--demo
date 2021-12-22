import { ITodoItem } from "../interface";

interface ITodoHistoryProps {
  historyTodo: ITodoItem;
}

const TodoHistory: React.FC<ITodoHistoryProps> = ({ historyTodo }) => {
  return <li>{historyTodo.title}</li>;
};

export default TodoHistory;
