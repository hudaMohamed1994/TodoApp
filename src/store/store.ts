import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['todos'],
      },
      thunk: {
        // thunk as middelware make the asyncronoud opertaions
        extraArgument: {AsyncStorage}, // Pass AsyncStorage as an extra argument to thunks for local presitance
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
