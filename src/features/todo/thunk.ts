import { ITodoItem } from "./interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import TodoAPI from "./api/todoAPI";

const fetchTodoThunk = createAsyncThunk("todo/fetch_todo", async () => {
  const response = await TodoAPI.getAll();
  return response.data;
});

const addTodoThunk = createAsyncThunk(
  "todo/add_todo",
  async (todo: ITodoItem) => {
    const response = await TodoAPI.addTodo(todo);
    console.log(response.data);
    return response.data;
  }
);

const removeTodoThunk = createAsyncThunk(
  "todo/remove_todo",
  async (id: string) => {
    const response = await TodoAPI.deleteTodo(id);
    console.log(response.data);
    return response.data.id;
  }
);

const updateTodoThunk = createAsyncThunk(
  "todo/update_todo",
  async (itemTodo: ITodoItem) => {
    const response = await TodoAPI.updateTodo(itemTodo);
    console.log(response.data);
    return response.data;
  }
);

export { fetchTodoThunk, addTodoThunk, removeTodoThunk, updateTodoThunk };
