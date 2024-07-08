import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import store, {RootState} from './src/store/store';
import {fetchTodos} from './src/store/todoSlice';
import TodoForm from './src/components/TodoForm';
import TodoList from './src/components/TodoList';
import {AppDispatch} from './src/store/store';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos); // get todos data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTodos());
        setLoading(false); // Set loading to false on success
      } catch (error) {
        console.error('Failed to fetch todos:', error);
        setLoading(false); // Set loading to false on failure
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Todo App</Text>
          <TodoForm />
          <TodoList todos={todos} />
        </>
      )}
    </View>
  );
};

const AppProvider: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppProvider;
