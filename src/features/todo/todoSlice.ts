import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ITodoItem } from "./interface";
import {
  addTodoThunk,
  fetchTodoThunk,
  removeTodoThunk,
  updateTodoThunk,
} from "./thunk";

interface TodoState {
  todos: ITodoItem[];
  isAdd: boolean;
  currentTodo: ITodoItem;
  historyTodos: ITodoItem[];
}

const initialState: TodoState = {
  todos: [],
  isAdd: true,
  currentTodo: { id: "", title: "", isUpdate: false },
  historyTodos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // addTodo: (state, action: PayloadAction<ITodoItem>) => {
    //   state.todos = [...state.todos, action.payload];
    // },
    // removeTodo: (state, action: PayloadAction<string>) => {
    //   state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    // },
    editTodo: (state, action: PayloadAction<ITodoItem>) => {
      state.isAdd = false;
      state.currentTodo = action.payload;
    },
    // updateTodo: (state, action: PayloadAction<ITodoItem>) => {
    //   const list = state.todos.map((todo) => {
    //     if (todo.id === action.payload.id) {
    //       return { ...action.payload };
    //     }
    //     return todo;
    //   });
    //   state.isAdd = true;
    //   state.todos = [...list];
    //   state.historyTodos = [state.currentTodo, ...state.historyTodos];
    // },
    cancelUpdateTodo: (state, action: PayloadAction<ITodoItem>) => {
      const list = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...action.payload };
        }
        return todo;
      });
      state.todos = [...list];
      state.isAdd = true;
    },
  },
  extraReducers: (builder) => {
    // load data
    builder.addCase(fetchTodoThunk.pending, () => {
      console.log("đang chờ load dữ liệu");
    });
    builder.addCase(fetchTodoThunk.fulfilled, (state, action) => {
      state.todos = action.payload;
      console.log("thành công load dữ liệu");
    });
    builder.addCase(fetchTodoThunk.rejected, () => {
      console.log("lỗi load dữ liệu");
    });
    // add
    builder.addCase(addTodoThunk.pending, () => {
      console.log("đang chờ add dữ liệu");
    });
    builder.addCase(addTodoThunk.fulfilled, (state, action) => {
      state.todos = [...state.todos, action.payload];
      console.log("thành công add dữ liệu");
    });
    builder.addCase(addTodoThunk.rejected, () => {
      console.log("lỗi add dữ liệu");
    });
    // remove
    builder.addCase(removeTodoThunk.pending, () => {
      console.log("đang chờ remove dữ liệu");
    });
    builder.addCase(removeTodoThunk.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      console.log("thành công remove dữ liệu");
    });
    builder.addCase(removeTodoThunk.rejected, () => {
      console.log("lỗi remove dữ liệu");
    });
    // update
    builder.addCase(updateTodoThunk.pending, () => {
      console.log("đang chờ update dữ liệu");
    });
    builder.addCase(updateTodoThunk.fulfilled, (state, action) => {
      const list = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...action.payload };
        }
        return todo;
      });
      state.isAdd = true;
      state.todos = [...list];
      state.historyTodos = [state.currentTodo, ...state.historyTodos];
      console.log("thành công update dữ liệu");
    });
    builder.addCase(updateTodoThunk.rejected, () => {
      console.log("lỗi update dữ liệu");
    });
  },
});

export const selectTodo = (state: RootState) => state.todo.todos;
export const selectIsAdd = (state: RootState) => state.todo.isAdd;
export const selectCurrentTodo = (state: RootState) => state.todo.currentTodo;
export const selectHistoryTodos = (state: RootState) => state.todo.historyTodos;

export const { editTodo, cancelUpdateTodo } = todoSlice.actions;

export default todoSlice.reducer;
