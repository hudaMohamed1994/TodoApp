import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateUniqueId } from '../HelperUtils';

interface Todo {
  id: string;
  text: string;
  createdAt: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
  },
});

export const { setTodos, addTodo, deleteTodo, editTodo } = todoSlice.actions;

export const fetchTodos = () => async (dispatch: AppDispatch) => {
  try {
    const todosData = await AsyncStorage.getItem('todos');
    const todos = todosData ? JSON.parse(todosData) : [];
    dispatch(setTodos(todos));
  } catch (error) {
    console.error('Failed to fetch todos from storage:', error);
  }
};

export const createTodo = (text: string) => async (dispatch: AppDispatch) => {
  try {
    const newTodo = { id: generateUniqueId(), text, createdAt: new Date().toISOString() };
    const todosData = await AsyncStorage.getItem('todos');
    const todos = todosData ? JSON.parse(todosData) : [];
    todos.push(newTodo);
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
    dispatch(addTodo(newTodo));
  } catch (error) {
    console.error('Failed to create todo:', error);
  }
};

export const removeTodo = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const todosData = await AsyncStorage.getItem('todos');
    const todos = todosData ? JSON.parse(todosData) : [];
    const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    dispatch(deleteTodo(id));
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
};

export const updateTodo = (todo: Todo) => async (dispatch: AppDispatch) => {
  try {
    const todosData = await AsyncStorage.getItem('todos');
    const todos = todosData ? JSON.parse(todosData) : [];
    const updatedTodos = todos.map((t: Todo) => t.id === todo.id ? todo : t);
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    dispatch(editTodo(todo));
  } catch (error) {
    console.error('Failed to update todo:', error);
  }
};

export default todoSlice.reducer;
