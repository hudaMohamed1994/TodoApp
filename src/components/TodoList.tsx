import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const {todos} = useSelector((state: RootState) => state.todos);
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem key={item.id} todo={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default TodoList;