import { ITodoItem } from "./../interface";
import { axiosClient } from "./axiosClient";

const TodoAPI = {
  getAll() {
    const url = `/todolist-ts`;
    return axiosClient.get(url);
  },
  addTodo(itemTodo: ITodoItem) {
    const url = `/todolist-ts`;
    return axiosClient.post(url, itemTodo);
  },
  deleteTodo(idTodo: string) {
    const url = `/todolist-ts/${idTodo}`;
    return axiosClient.delete(url);
  },
  updateTodo(itemTodo: ITodoItem) {
    const url = `/todolist-ts/${itemTodo.id}`;
    return axiosClient.put(url, itemTodo);
  },
};
export default TodoAPI;
