import "./App.css";
import TodoList from "./features/todo/TodoList";
import Modal from "./features/todo/Modal";
import { useDispatch } from "react-redux";
import { fetchTodoThunk } from "./features/todo/thunk";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodoThunk());
  }, [dispatch]);
  return (
    <div className="App">
      <Modal />
      <TodoList />
    </div>
  );
}

export default App;
